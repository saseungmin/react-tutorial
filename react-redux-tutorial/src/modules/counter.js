import {createAction, handleActions} from 'redux-actions';


// 액션 타임 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

//redux-actions사용해서 액션 생성 함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기 상태 및 리듀서 함수 만들기
const initialState = {
  number: 0,
};

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }

//redux-actions handleActions 함수 사용해서 리듀서 함수 만들기
// 첫번째 파라미터에는 각 액션에 대한 업데이트 함수를 넣어주고, 두 번쨰 파라미터에는 초기 상태를 넣어준다.
const counter = handleActions(
    {
        [INCREASE] : (state, action) => ({number:state.number+1}),
        [DECREASE] : (state, action) => ({number:state.number-1}),
    },
    initialState,
)

export default counter;
