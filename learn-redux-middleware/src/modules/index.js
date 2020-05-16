import {combineReducers} from 'redux';
//import counter from './counter';  => ledux-thunk
import {all} from 'redux-saga/effects';
import counter, {counterSaga} from './counter';
// import sample from './sample'; => ledux-thunk
import sample , {sampleSaga} from './samplesaga';
import loading from './loading';

const rootReducer = combineReducers({
    counter,
    sample,
    loading
});

export function* rootSaga(){
    // all 함수는 여러 Saga를 합쳐 주는 역할을 한다.
    yield all([counterSaga(),sampleSaga()]);
}

export default rootReducer;