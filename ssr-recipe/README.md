# ✔ 서버 사이드 렌더링
> 서버 사이드 렌더링은 UI를 서버에서 렌더링하는 것을 의미하고 초기 렌더링을 서버쪽에서 대신해준다.

✒ 서버 사이드 렌더링 장점
> - 구글, 네이버 같은 검색 엔진이 페이지를 원활하게 수집할 수 있다.
> - 초기 렌더링 성능을 개선할 수 있다.

✒ 서버 사이드 렌더링 단점
> - 원래 브라우저가 해야 할 일을 서버가 대신 처리하는 것이므로 서버 리소스가 사용된다.
> - 사용자 많아지면 캐싱과 로드 밸런싱을 통해 성능 최적화를 해줘야 한다.
> - 프로젝트 구조 복잡, 데이터 미리 불러오기, 코드 스플리팅과의 호환(Loadable Components 사용)등을 고려해야되서 개발이 복잡해진다.

✒ reaact-router-dom 설치
<pre>$ yarn add react-router-dom</pre>

✒ 컴포넌트와 페이지 컴포넌트 만들기
- 생략(소스코드 참고)

##  1. 서버 사이드 렌더링 구현
- 웹팩 설정을 커스터마이징해야한다.
<pre>
$ git add .
$ git commit -m 'Commit'
// 웹팩 관련 설정 꺼내기
$ yarn eject
</pre>

### 1.2 엔트리 만들기
- 엔트리는 웹팩에서 프로젝트를 불러올 떄 가장 먼저 불러오는 파일
- <code>index.server.js</code> 참고 
<pre>
// 서버에서 리액트 컴포넌트를 렌더링할 때 ReactDOMServer.renderToString 사용
const html = ReactDOMServer.renderToString(
    < div> start ssr< /div>
)
console.log(html);
</pre>

### 1.3 웹팩 환경 설정 작성
📌 config/paths.js에 <code>module.exports</code> ⬅ 수정
<pre>
  ssrIndexJs: resolveApp('src/index.server.js'), // 서버 사이드 렌더링 엔트리
  ssrBuild: resolveApp('dist'), // 웹팩 처리 후 저장 경로
</pre>

📌 config/webpack.config.server.js 생성
<pre>
// 기본 설정
const paths = require('./paths');

module.exports = {
  mode: 'production',  // 프로덕션 모드로 설적하여 최적화 옵션들을 활성화
  entry: paths.ssrIndexJs, //엔트리 경로
  target: 'node', // node 환경에서 실행될 것이라는 것을 알려주기 위해서
  output: {
    path: paths.ssrBuild, //빌드이름
    filename: 'server.js', //파일이름
    chunkFilename: 'js/[name].chunk.js',  //청크 파일 이름
    publicPath: paths.publicUrlOrPath //정적 파일이 제공될 경로
  },
}
</pre>

-  로더를 설정한다.
> 웹팩의 로더는 파일을 불러올 때 확장자에 맞게 필요한 처리를 해준다.
<pre>
config/webpack.config.server.js 참고
module: {
    rules: [
      {
        oneOf: [
            // 생략 
        ]
      }
    ]
}
</pre>

-  <code>node_modules</code> 내부의 라이브러리를 불러올 수 있게 설정
<pre>
  resolve: {
    modules: ['node_modules']
  }, 
</pre>
- 위와 같이 했을 때, <code>react</code>,<code>react-dom/server</code> 같은 라이브러리를 <code>import</code> 구문으로 불러오면 <code>node_modules</code>에서 찾아 사용한다.
- 서버를 위해 번들링할 때는 <code>node_modules</code>에서 불러오는 것을 제외하고 번들링하는 것이 좋다. 이를 위해, <code>webpack-node-externals</code>라이브러리 사용한다.
<pre>
$ yarn add webpack-node-externals

// webpack-node-externals 적용
const nodeExternals = require('webpack-node-externals');
externals: [nodeExternals()], // node-modules에서 불러오는 것을 제외하고 번들링하기
</pre>

- 환경 변수 주입하기
<pre>
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0,-1));

(...)
// 프로젝트 내에서 process.env.NODE_ENV 값을 참조하여 현재 개발 환경인지 아닌지를 알 수 있다.
plugins: [
    new webpack.DefinePlugin(env.stringified) // 환경변수를 주입
]
</pre>

### 1.4 빌드 스크립트 작성하기
- 만든 환경 설정을 사용하여 웹팩으로 프로젝트를 빌드하는 스크립트 작성
- scripts/build.server.js 작성 후 명령어 실행
<pre>
$ node scripts/build.server.js
// 실행 후
$ node dist/server.js
</pre>
- package.json scripts 수정
<pre>
  "scripts": {
      // 생략
    "start:server": "node dist/server.js",
    "build:server": "node scripts/build.server.js"
  },
</pre>
- 명령어로 실행
<pre>
$ yarn build:server
$ yarn start:server
</pre>

### 1.5 서버 코드 작성하기
- <code>Express</code> Node.js 웹 프레임워크 사용
<pre>
$ yarn add express
</pre>
- index.server.js 수정(주석 참고)
- 서버 사이드 렌더링 용도로 사용하는 라우터로 <code>props</code>로 넣어 주는 <code>location</code> 값에 따라 라우팅되고 <code>req.url</code>는 요청에 대한 정보를 지니고있다. 또한, <code>context</code>는 HTTP 상태 코드를 설정해 줄 수 있다.
<pre>
< StaticRouter location={req.url} context={context}>
    < App/>
< /StaticRouter>
</pre>

### 1.6 정적 파일 제공하기
- index.server.js 수정(주석 참고)
<pre>
// static 미들웨어를 사용하여 서버를 통해 build에 있는 Js,Css 정적 파일들에 접근할 수 있도록 해준다.
const serve = express.static(path.resolve('./build'),{
    index : false // "/" 경로에서 index.html을 보여주지 않도록 설정
})

app.use(serve); //순서 중요!  serverRender 전에 위치해야한다.
app.use(serverRender);
</pre>

- JS와 CSS 파일을 불러오도록 html에 코드를 삽입해 주어야 한다.
- <code>asset-manifest.json</code>을 참고하며 작성한다.
- index.server.js 수정(주석 참고)

<pre>
import fs from 'fs';

// build/asset-manifest.json에서 파일 경로들을 조회한다.
const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'),'utf-8')
);

const chunks= Object.keys(manifest.files).filter(key => /chunks\.js$/.exec(key)) // chunks.js로 끝나는 키를 찾는다.
        .map(key => `< script src= "${manifest.files[key]}">< /script>`)// 스크립트 태그로 변환
        .join(''); //각 배열을 합친다.

function createPage(root){
    return  `생략...`
}
</pre>

- 개발자 도구 Network 탭에서 확인해서 링크를 눌렀을때 클라이언트 렌더링이 되야한다. 즉, 다른 링크를 클릭하여 다른 페이지로 이동할 때 네트워크 요청이 추가로 발생하면 안된다.
- 첫 번째 렌더링은 서버에서 하지만, 그 이후는 브라우저에서 처리한다.