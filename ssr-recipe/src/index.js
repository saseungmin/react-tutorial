import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
const store =createStore(
  rootReducer,
  window.__PRELOADED_STATE__, // 이름 그대로 이 값을 초기 상태로 사용함
  applyMiddleware(thunk),
  );

// 엔트리는 웹팩에서 프로젝트를 불러올 떄 가장 먼저 불러오는 파일 (현재 index.js)
ReactDOM.render(
  // 리덕스 적용
  <Provider store={store}>
    {/* 라우터 적용 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
