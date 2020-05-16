// 코드 리팩토링
import {call, put} from 'redux-saga/effects';
import {finishLoading,startLoading} from '../modules/loading';


// 사용법 : createRequestSaga("GET_USERS", api.getUsers);
export default function createRequestSaga(type, request){
    // 성공 및 실패 액션 타입을 정의한다.
    console.log("type========================" ,type);
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return function*(action){
        yield put(startLoading(type)); //로딩 시작

        try {
            //                         api.getUsers / post.id
            const response = yield call(request,action.payload);
            yield put({
                type : SUCCESS,
                payload : response.data
            });
        } catch (e) {
            yield put({
                type : FAILURE,
                payload :e,
                error : true
            })
        }
        yield put(finishLoading(type));
    };
}