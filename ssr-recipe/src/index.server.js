import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import PreloadContext from './lib/PreloadContext';

// build/asset-manifest.json에서 파일 경로들을 조회한다.
const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'),'utf-8')
);

const chunks= Object.keys(manifest.files).filter(key => /chunks\.js$/.exec(key)) // chunks.js로 끝나는 키를 찾는다.
        .map(key => `<script src= "${manifest.files[key]}"></script>`)// 스크립트 태그로 변환
        .join(''); //각 배열을 합친다.

function createPage(root, stateScript){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      <link href="${manifest.files['main.css']}" rel="stylesheet" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      ${stateScript}
      <script src="${manifest.files['runtime-main.js']}"></script>
      ${chunks}
      <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
      `;
}

const app = express();
// 서버 사이드 렌더링을 처리할 핸들러 함수.
const serverRender = async (req, res, next) => {
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해준다.
    const context = {};
    // 서버에서 리덕스 설정
    // 요청이 들어올때 마다 새로운 스토어 생성
    const store = createStore(rootReducer, applyMiddleware(thunk));

    const preloadContext = {
      done : false,
      promises : []
    }
    const jsx = (
        // StaticRouter는 서버 사이드 렌더링 용도로 사용하는 라우터
        // props로 넣어주는 값에 따라 라우팅 해준다. req 객체는 요청에 대한 정보를 지니고 있다.
        // context는 이 값을 사용하여 나중에 렌더링한 컴포넌트에 따라 HTTP 상태 코드를 설정해 줄 수 있다.
        <PreloadContext.Provider value={preloadContext}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
          </Provider>
        </PreloadContext.Provider>
    );
    // renderToStaticMarkup으로 한번 렌더링한다.
    // 리액트를 사용하여 정적인 페이지를 만들 떄 사용한다.
    // 이 결과물은 클라이언트 쪽에서 HTML DOM 인터랙션을 지원하기 힘들다.
    // 단지 Preloader로 넣어 준 함수를 호출하기 위해서이다. 그리고 renderToString보다 좀 더 빠르다.
    ReactDOMServer.renderToStaticMarkup(jsx);
    try {
      await Promise.all(preloadContext.promises); // 모든 프로미스를 기달린다.
    } catch (e) {
      return res.status(500);
    }
    preloadContext.done = true;
    // 서버에서 리액트 컴포넌트를 렌더링할 때 ReactDOMServer.renderToString 사용
    const root = ReactDOMServer.renderToString(jsx); //렌더링
    // JSON을 문자열로 변환하고 악성 스크립트가 실행되는 것을 방지하기 위해 <를 치환 처리한다.
    // https://redux.js.org/recipes/server-rendering#security-considerations
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`; //리덕스 초기 상태를 스크립트로 주입
    res.send(createPage(root,stateScript)); //클라이언트에게 결과물 응답.
}


// static 미들웨어를 사용하여 서버를 통해 build에 있는 Js,Css 정적 파일들에 접근할 수 있도록 해준다.
const serve = express.static(path.resolve('./build'),{
    index : false // "/" 경로에서 index.html을 보여주지 않도록 설정
})

app.use(serve); //순서 중요!  serverRender 전에 위치해야한다.
app.use(serverRender);

// 5000포트로 서버를 가동
app.listen(5000, () => {
    console.log("Running on http://localhost:5000");
    
})