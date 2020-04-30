# [React] 시작해보자
- START 2020/04/29
<hr>


1. React란?
- 자바스크립트 라이블러리
- 페이스북과 인스타그램에서 사용자 경험을 향상하기 위해 만든 라이브러리.
- 이벤트 요청 시 서버에서 코드를 받아 다시 렌더링해야 되는 문제를 해결하기 위해 만들어짐.
 > #### 프레임워크가 아니다.
 - 사용자 인터페이스 라이브러리
 - 캡슐화를 잘 시켜줘서 재사용성이 높다.
 - "데이터 흐름이 단방향인 시스템 아키텍처 Flux 제안.
 
 <hr>
 
 2. React 특징
 #### - JSX(JavaScript XML): 템플릿을 사용하지 않는다.
 >> 자바스크립트에서 HTML과 자바스크립트 변수 및 속성 값을 사용 할 수 있게 해주며 *.jsx파일은 webpack, Browserify 로 자바스크립트로 컴파일 후, *.js 변환되어 사용하며 테스트 코드는 Bable로 별도의 컴파일 없이 사용할 수 있다. 그리고 이 툴 들이 ECMAScript6,7 지원을 하기 때문에 JSX를 사용시에 ECMAScript6,7도 같이 사용을 많이 함.

#### - Virtual DOM: 전체 DOM을 다시 그리지 않는다.
>> 데이터가 변할 때 바뀐 부분만을 업데이트하여 "새로 고침" 하지 않아도 변경된 내용 확인이 가능.

#### -Unidirectional Data Flow: 데이터가 양방향으로 흐르지 않는다.

<hr>

3. Webpack과 Bable의 용도?
- 여러가지 파일을 한개로 결합하기 위해서 Webpack 사용
- JSX를 비롯한 새로운 자바스크립트 문법들을 사용하기 위해서 우리는 Babel이라는 도구 사용.

<hr>

4. 필요한 것들
- Node.js 설치 
- Yarn 설치 (npm보다 더 나은 속도, 더 나은 캐싱 시스템을 사용하기 위함)
- git
- visual Studio Code

<hr>

5. 시작
- create-react-app 설치
<pre><code>
yarn global add create-react-app
create-react-app hello-react
cd hello-react
yarn start
</code></pre>

<hr>

6. App.js 주석 확인하기
<code><pre>import React, { Component } from 'react'; </pre></code>
>> JSX를 사용할려면 꼭 필요!
>> webpack을 사용하기에 가능한 작업

## 컴포넌트 만드는방법
>> ### 1. 클래스를 통해서 만드는 방법
>>> 이때는 render() 함수 꼭 필요 그 후 JSX를 return 필요
>>> export로 다른 곳에서 불러와서 사용 할 수 있도록 해준다.
<code><pre> 
class App extends Component{
       render() {
          return (
          )
       }
}
export default App;
</pre></code>

>> ### 2. 함수를 통하여 컴포넌트 만드는 방법
>>> --- 나중에.. ---

## 컴포넌트 보여주기
>> index.js
<code><pre>
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
</pre></code>
>> StrictMode는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구.
>> Fragment와 같이 UI를 렌더링하지 않으며, 자손들에게 부가적인 검사와 경고를 활성화한다.
>> StrictMode는 개발 모드에서만 활성화되기 때문에, 프로덕션 빌드에는 영향을 주지 않는다.   
>> StrictMode 안에 있는 App의 자손까지 검사가 이루어짐.
>>> - 안전하지 않는 생명주기를 사용하는 컴포넌트 발견
>>> - 레거시 문자열 ref 사용에 대한 경고
>>> - 권장되지 않는 findDOMNode 사용에 대한 경고
>>> - 예상치 못한 부작용 검사
>>> - 레거시 context API 
