import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

// 하나의 리듀서로 합치기
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
