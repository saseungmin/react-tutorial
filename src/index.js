import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 브라우저 상에 우리의 리엑트 컴포넌트를 보여주기 위해서는 ReactDOM.render 함수 사용.
// 첫번째 파라미터는 컴포넌트를 어떤 DOM에 그릴지 정해준다.
// 두번째 파라미터는 id가 root인 DOM을 찾아서 그리도록 설정이 되어있다. => public/index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
