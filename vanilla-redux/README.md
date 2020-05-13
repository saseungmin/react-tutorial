# ※ 리덕스 라이브러리 이해하기
## 1. 리덕스 개념 정리
- 리덕스는 가장 많이 사용하는 리액트 상태 관리 라이브러리이다.
- 컴포넌트의 상태 없데이트 관련 로직을 다른 파일로 분리시켜서 효율적으로 관리 할 수 있다.
> ### 1.1 액션
- 상태에 어떠한 변화가 필요하면 액션이란 것이 발생한다.
- 하나의 객체로 표현된다.
- <b>type 필드는 반드시 가지고 있어야 한다. </b>
<pre><code>
{
  type : 'MY_VALUE'
  data : {
    name : 'seung',
    email : 'dbd02169@naver.com'
}
</code></pre>
> ### 1.2 액션 생성 함수
- 액션 객체를 만들어 주는 함수
<pre><code>
const addUser = name => ({
    type : 'MY_VALUE',
    name
});
</code></pre>
> ### 1.3 리듀서
- reducer는 변화를 일으키는 함수.
- 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아온다.
- <b>새로운 상태를 만들어서 반환해준다.</b>
<pre><code>
// 초깃값 정의
const initialState ={
    toggle : false,
    counter : 0
};
// 리듀서 함수 정의
function reducer(state = initialState, action){
    //action.type에 따라 다른 작업을 처리함.
    switch(action.type){
        case TOGGLE_SWITCH:
            return {
                ...state, // 불변성을 유지 해야한다.
                toggle: !state.toggle
            };
        default :
            return state;
    }
}
</code></pre>

> ### 1.4 스토어
- 프로젝트에 리덕스를 적용하기 위해 스토어를 만든다.
- 한 개의 프로젝트에는 단 하나의 스토어만 가질 수 있다.
<pre><code>
//스토어 만들기
import {createStore} from 'redux';
const store = createStore(reducer);
</code></pre>

> ### 1.5 디스패치
- 디스패치(dispatch)는 스토어의 내장 함수 중 하나이다.
- 이 함수는 액션 객체를 파라미터로 넣어서 호출한다.
- 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.
<pre><code>
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
}
</code></pre>
> ### 1.6 subscribe
- subscribe(구독)은 스토어의 내장 함수 중 하나.
- 리스너 함수를 파라미터로 넣어서 호출하면 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.
<pre><code>
const render = () =>{

}
render();

store.subscribe(render);
</code></pre>
> ### 1.7 리덕스 라이브러리 설치
<pre><code>
$ yarn add redux
</code></pre>

## 2. 리덕스의 세 가지 규칙
> ### 2.1 단일 스토어
- 하나의 애플리케이션 안에는 하나의 스토어가 들어 있다.
- 여러 개 사용하는 것은 불가능하지는 않지만 업데이트가 너무 빈번하게 일어나 상태 관리가 복잡해질 수 있다. => 권장하지 않음.
> ### 2.2 읽기 전용 상태
- 리덕스 상태는 읽기 전용이다.
- 리덕스도 상태를 업데이트할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 한다.
- 리덕스에서 불변성을 유지해야 하는 이유는 <b>내부적으로 데이터가 변경되는 것을 감지</b>하기 위해 <b>앝은 비교</b> 검사를 하기 때문이다.
> ### 2.3 리듀서는 순수한 함수
- 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.
- 파라미터 외의 값에는 의존하면 안된다.
- 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.
