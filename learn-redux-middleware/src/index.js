import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer, { rootSaga } from './modules';
// import loggerMiddleware from './lib/loggerMiddleware';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

const logger= createLogger();
//applyMiddleware 리덕스 미들웨어를 스토어에 적용
// redux-thunk 적용
//const store = createStore(rootReducer ,applyMiddleware(logger, ReduxThunk));
// redux- saga 적용
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger,ReduxThunk,sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
