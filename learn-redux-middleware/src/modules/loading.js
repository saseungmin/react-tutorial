import {createAction, handleActions} from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// 액션 생성 함수는 createRequestThunk에서 사용된다.
// 요청을 위한 액션 타입을 payload로 설정한다. (ex> "sample/GET_POST")
export const startLoading = createAction(
    START_LOADING, // type
    requestType => requestType  // payload
);

export const finishLoading = createAction(
    FINISH_LOADING,
    requestType => requestType
);

const initialState = {};

const loading = handleActions(
    {
        [START_LOADING] : (state,action) => ({
            ...state,
            [action.payload] : true
        }),
        [FINISH_LOADING] : (state, action) => ({
            ...state,
            [action.payload] : false
        })
    },initialState
)

export default loading;