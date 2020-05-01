import React, {Component, Fragment} from 'react';
import './App.css';
import MyName from './MyName';
import Counter from './Counter';


class App extends Component{
  render(){
    //JSX 안에 자바스크립트 값 사용하기
    //var은 scope가 함수단위
    // function foo() {
    //   var a = 'hello';
    //   if (true) {
    //     var a = 'bye';
    //     console.log(a); // bye
    //   }
    //   console.log(a); // bye
    // }
    //const와 let은 scope가 블록 단위
    // function foo() {
    //   let a = 'hello';
    //   if (true) {
    //     let a = 'bye';
    //     console.log(a); // bye
    //   }
    //   console.log(a); // hello
    // }
    const name = 'react';
    const value = 1;

    //스타일은 객체 형태로 작성
    const style ={
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: '24px'
    }
    return(
      // 리엑트에서는 꼭 테그는 열었으면 닫자.
      // JSX 내부에서 조건부 렌더링을 할 때는 보통 삼항 연산자를 사용, AND 연산자를 사용
      // 반면 if문을 사용할 수 없다.(사용하려면 IIFE 사용)
      <Fragment>
        <MyName />
        <div className="App">리엑트</div>
        <div style ={style}>
          hello {name}!
        </div>
        <div>
          {
            /* 3항 연산자 */
            1+1 === 1 ? (<div> 맞아요! </div>) : (<div> 틀려요! </div>)
          }
          {
            /* AND 연산자 */
            /* 단순히 조건이 TRUE 일 때만 보여주고 false 경우 아무것도 안보여줄 때 사용 */
            1+1 === 2 && (<div> 맞아요!</div>)
          }
        </div>
        <div>
          {
            /* 복잡한 조건은 웬만하면 JSX 밖에서 로직을 작성 */
            (function(){
              if (value === 1)return (<div>하나</div>)
              if (value === 2)return (<div>둘</div>)
              if (value === 3)return (<div>셋</div>)
            })()
          }
          {
            /* 또 다른 방식 (화살표 함수) */
            /* 화살표 함수는 this, arguments, super 개념이 없는 익명 함수. 때문에 생성자 사용 못함. */
            (() =>{
              if (value === 1)return (<div>하나</div>)
              if (value === 2)return (<div>둘</div>)
              if (value === 3)return (<div>셋</div>)
            })()
          }

        </div>
        <Counter/>
      </Fragment>
    )
  }
}

export default App;