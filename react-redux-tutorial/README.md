# ※ 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

## 1. 작업 환경 설정하기
- 리액트 애플리케이션에서 리덕스를 사용하면, 상태 업데이트에 관한 로직을 모듈로 따로 분리하여 컴포넌트 파일과 별개로 관리할 수 있으므로 유지 보수에 용이하다.
- 리덕스를 사용할 때 react-redux라는 라이브러리에서 제공하는 유틸 함수(connect)와 컴포넌트(Provider)를 사용하여 처리한다.
- <b>리덕스와 react-redux 라이브러리 설치</b>
<pre>
$ yarn add redux react-redux
</pre>
- 리덕스를 사용할 떄 가장 많이 사용하는 패턴은 <b>프레젠테이셔널 컴포넌트</b>와 <b>컨테이너 컴포넌트</b>를 분리하는 것이다.
- <b>프레젠테이셔널 컴포넌트</b>란 주로 상태 관리가 이루어지지 않고, <code>props</code>를 받아 와서 UI를 보여 주기만 하는 컴포넌트 (src/components)
- <b>컨테이너 컴포넌트</b>는 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 한다.(src/container)

## 2. 리덕스 관련 코드 작성하기
### 2.1 일반적인 구조
- 액션 타입, 액션 생성 함수, 리듀서 코드를 세 개의 다른 디렉터리에 따로 만드는 방식.
### 2.2 Ducks 패턴
- 액션 타입, 액션 생성 함수, 리듀서 코드를 파일 하나에 몰아서 작성하는 방법.
### 2.3 초기 상태 및 리듀서 함수 만들기
- 이 설명은 [vanilla-redux](https://github.com/saseungmin/react-tutorial/tree/master/vanilla-redux)에 적혀있음.
- 액션 생성 함수는 <code>export</code>로 내보내 주었다.
<pre>
export const increase = () => ({ type: INCREASE });
</pre>
- <code>export</code>는 여러 개를 내보낼 수 있지만 <code>export default</code>는 단 한 개만 내보낼수 있다.
- 불러오는 방식도 <code>export</code>는 <code>import {changeInput} from '../modules/todos';</code> <code>{}</code>를 사용해서 불러오고 <code>export default</code>는 <code>import counter from './counter'</code>방식으로 불러온다.

### 2.4 루트 리듀서 만들기
- <code>createStore</code>함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야한다. 떄문에 여러 개의 리듀서를 만들시에 하나로 합쳐줘야 하는데 그때는 리덕스에서 제공하는 <code>combineReducers</code>라는 유틸 함수를 사용한다.
<pre>
// modules/index.js
import { combineReducers } from 'redux';
// 하나의 리듀서로 합치기
const rootReducer = combineReducers({
  counter,
  todos,
});
</pre>

## 3. 리액트 애플리케이션에 리덕스 적용하기
### 3.1 스토어 만들기
<pre>
// src/index.js
import {createStore} from 'redux';
import rootReducer from './modules';
// 스토어 생성
const store = createStore(rootReducer, composeWithDevTools());
</pre>
### 3.2 Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
<pre>
// src/index.js
import {Provider} from 'react-redux';
// Provider 컴포넌트 사용하여 프로젝트에 리덕스 적용
// App 컴포넌트를 Provider 컴포넌트로 감싸준다. => store를 props로 전달해 줘야한다.
ReactDOM.render(
  < Provider store={store}>
    < App />
  < /Provider>,
  document.getElementById('root')
);
</pre>

### 3.3 Redux DevTools 설치
- 리덕스 개발자 도구이며, 크롬 확장 프로그램으로 설치하여 사용가능.
- Redux DevTools
