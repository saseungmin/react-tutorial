# ※ Context API

## 1. Context API 흐름 이해하기
- 전역적으로 사용할 데이터가 있을 때 유용한 기능.
- 많은 컴포넌트를 거쳐야 할 때나 다루어야 하는 데이터가 많은 경우 상태 관리 라이브러리(리덕스, MobX)를 사용하여 전역 상태 관리 작업을 편하게 처리한다.
- 기존에는 최상위 컴포넌트에서 여러 컴포넌트를 거쳐 <code>props</code>로 원하는 상태와 함수로 전달했지만, Context API를 사용하면 <code>Context</code>를 만들어 한 번에 원하는 값을 받아와서 사용 가능.

## 2. Context API 사용법 익히기
### 2.1 Context 만들기
- 새 Context를 만들 떄는 <code>createContext</code> 함수를 사용한다.
- 파라미터에는 해당 Context의 기본 상태를 지정한다.
<pre><code>
import {createContext} from 'react';
const ColorContext = createContext({color:'black',subcolor : 'red'});
</code></pre>
### 2.2 Consumer
- <code>props</code>로 받아 오는 것이 아니라 <code>Consumer</code>라는 컴포넌트를 통해 조회한다.
<pre><code>
< ColorContext.Consumer>
</code></pre>
### 2.3 Provider
- <code>Provider</code>를 사용하면 Context의 <code>value</code>를 변경할 수 있다.
- <code>Provider</code>에 <code>value</code>를 명시하지 않으면, 기본값을 명시하지 않으면 오류가 발생한다.
<pre><code>
< ColorContext.Provider value={{color:'red'}}>
</code></pre>

## 3. 동적 Context 사용하기
- 주석 참고

## 4. Consumer 대신 Hook 또는 static contextType 사용하기
### 4.1 useContext Hook 사용하기
- 리액트에 내장되어 있는 Hooks 중에 <code>useContext</code> Hook을 사용하면, 함수형 컴포넌트에서 Context를 편하게 사용가능하다.
<pre><code>
import React, { useContext } from 'react';
// userContext Hook 사용하기.
const {state} = useContext(ColorContext);
</code></pre>
### 4.2 static contextType 사용하기
- 클래스형 컴포넌트에서 Context를 더 쉽게 사용하는 방법으로 <code>static contextType</code>을 정의하는 방법.
- 단점은 한 클래스에서 하나의 Context밖에 사용하지 못한다.
<pre><code>
 static contextType 클래스형 컴포넌트 일때
 class SelectColors extends Component {
     static contextType = ColorContext;

     handleSetColor = color =>{
         this.context.actions.setColor(color)
     }
     handleSetSubcolor = subcolor =>{
         this.context.actions.setSubcolor(subcolor)
     }

 };
</code></pre>
