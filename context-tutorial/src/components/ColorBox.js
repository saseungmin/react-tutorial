import React, { useContext } from 'react';
//import {ColorConsumer} from '../contexts/color';
import ColorContext from '../contexts/color';


const ColorBox = () => {
    // userContext Hook 사용하기.
    const {state} = useContext(ColorContext);
    return (
        /*<ColorConsumer>*/ 
            /*<ColorContext.Consumer>*/
            /* 중괄호를 열어서 함수를 사용했다.
                이러한 패턴을 Function as a child or Render Props라고 한다.
                컴포넌트의 children이 있어야 할 자리에 일반 JSX혹은 문자열이 아닌 함수를 전달하는 것.
                color.js에서 createcontext로 넘겨준 값을 value로 받는다.
            */
            /*({state}) => ()*/
        // useContext Hook 사용
        <>
            <div style={{width:'300px',
            height: '300px',
            background: state.color
            }} />
            <div style={{
                width : '200px',
                height : '200px',
                background : state.subcolor
            }}/>
        </>
            /*</ColorContext.Consumer>*/    
        /*</ColorConsumer>*/ 
    );
};

export default ColorBox;