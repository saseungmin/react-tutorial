import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // 웹 애플리케이션에 있는 HTML5의 history API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고
  // 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해준다.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
