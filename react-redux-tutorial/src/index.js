import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';

// 스토어 생성
const store = createStore(rootReducer, composeWithDevTools());


// Provider 컴포넌트 사용하여 프로젝트에 리덕스 적용
// App 컴포넌트를 Provider 컴포넌트로 감싸준다. => store를 props로 전달해 줘야한다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
