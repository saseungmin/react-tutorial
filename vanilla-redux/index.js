//스토어 만들기
import {createStore} from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// 액션 액션이름은 대문자. 고유해야한다.
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 객체를 만드는 액션 생성 함수
// type 값은 반드시 가지고 있어야한다.
const toggleSwitch = () => ({type : TOGGLE_SWITCH});
const increase = difference => ({type : INCREASE, difference});
const decrease = () => ({type : DECREASE});

// 초깃값 정의
const initialState ={
    toggle : false,
    counter : 0
};

// 리듀서 함수 정의
// 리듀서 함수가 맨 처음 호출될 때는 state가 undefined. initialState를 기본값으로 사용
function reducer(state = initialState, action){
    //action.type에 따라 다른 작업을 처리함.
    switch(action.type){
        case TOGGLE_SWITCH:
            return {
                ...state, // 불변성을 유지 해야한다.
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter : state.counter + action.difference
            };
        case DECREASE :
            return {
                ...state,
                counter : state.counter - 1
            }
        default:
            return state;
    }   
}

// 스토어 만들기
const store = createStore(reducer);

// render 함수
const render = () =>{
    const state = store.getState(); // 현재 상태를 불러온다.
    // 토글 처리
    if(state.toggle){
        divToggle.classList.add('active');
    }else{
        divToggle.classList.remove('active');
    }
    // 카운터 처리
    counter.innerText = state.counter;
};

render();
store.subscribe(render);

divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
}

btnIncrease.onclick = () => {
    store.dispatch(increase(1));
}

btnDecrease.onclick = () => {
    store.dispatch(decrease());
}