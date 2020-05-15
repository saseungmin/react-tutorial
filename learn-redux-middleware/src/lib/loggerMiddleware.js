
// store : 리덕스 스토어 인스턴스
// action 디스패치된 액션을 가리킨다
// next store.dispatch와 비슷한 역할을 하지만 next(action)호출하면 그 다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 
// 미들웨어가 없다면 리듀서에게 액션을 넘겨준다.
// store.dispatch를 하면 첫 번째 미들웨어부터 다시 시작한다.
// 미들웨어에서 next를 사용하지 앟으면 액션이 리듀서에게 전달되지 않고 액션이 무시된다.
//미들웨어 기본구조
const loggerMiddleware = store => next => action => {
    console.group(action && action.type); // 액션 타입으로 log를 그룹화 counter/INCREAES
    console.log("이전 상태",store.getState()); // 이전 상태 {counter: 0}
    console.log("액션",action); // 액션 {type: "counter/INCREAES", payload: Class}
    next(action); //다음 미들웨어 혹은 리듀서에게 전달
    console.log("다음 상태",store.getState());//업데이트된 상태  다음 상태 {counter: 1}
    console.groupEnd(); //그룹끝
    
};

// 같은 구조
// const loggerMiddleware = function loggerMiddleware(store){
//     return function(next){
//         return function (action){

//         }
//     }
// }
export default loggerMiddleware;