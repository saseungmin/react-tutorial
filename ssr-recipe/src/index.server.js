import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';

// build/asset-manifest.json에서 파일 경로들을 조회한다.
const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'),'utf-8')
);

const chunks= Object.keys(manifest.files).filter(key => /chunks\.js$/.exec(key)) // chunks.js로 끝나는 키를 찾는다.
        .map(key => `<script src= "${manifest.files[key]}"></script>`)// 스크립트 태그로 변환
        .join(''); //각 배열을 합친다.

function createPage(root){
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
      <script src="${manifest.files['runtime-main.js']}"></script>
      ${chunks}
      <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
      `;
}

const app = express();
// 서버 사이드 렌더링을 처리할 핸들러 함수.
const serverRender = (req, res, next) => {
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해준다.
    const context = {};
    const jsx = (
        // StaticRouter는 서버 사이드 렌더링 용도로 사용하는 라우터
        // props로 넣어주는 값에 따라 라우팅 해준다. req 객체는 요청에 대한 정보를 지니고 있다.
        // context는 이 값을 사용하여 나중에 렌더링한 컴포넌트에 따라 HTTP 상태 코드를 설정해 줄 수 있다.
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    );
    // 서버에서 리액트 컴포넌트를 렌더링할 때 ReactDOMServer.renderToString 사용
    const root = ReactDOMServer.renderToString(jsx); //렌더링
    res.send(createPage(root)); //클라이언트에게 결과물 응답.
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