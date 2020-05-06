import React,{useReducer} from 'react';

//현재 상태와 업데이트를 위해 필요한 정보를 담은 액션값을 전달받아 새로운 상태를 반환하는 함수. (불변성 유지)
function reducer(state,action){
    switch (action.type){
        case 'INCREMENT':
            return {value : state.value + 1};
        case 'DECREMENT':
            return {value : state.value -1};
        default :
        //아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}


const Counter = () => {
    //const [value,setValue] = useState(0);
    const [state, dispatch] = useReducer(reducer,{value : 0});
    return (
        <div>
            <p>
                {/* 현재 카운터 값은 <b>{value}</b>입니다. */}
                현재 카운터 값은 <b>{state.value}</b>입니다.

            </p>
            {/* <button onClick={() => setValue(value+1)}>+1</button>
            <button onClick={() => setValue(value-1)}>-1</button> */}
            <button onClick={() => dispatch({type : 'INCREMENT'})}>+1</button>
            <button onClick={() => dispatch({type : 'DECREMENT'})}>-1</button>

        </div>
    );
};

export default Counter;