# ※ TodoList 만들어보기

## 기능
- TodoTemplate : 화면을 띄어주는 제일 큰 틀 / children으로 내부 JSX를 props로 받아와 렌더링 해준다.
- TodoInsert : 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 input의 상태를 관리
- TodoListItem : 각 할 일 항목에 대한 정보를 보여주는 컴포넌트. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여줌.
- TodoList : todos 배열을 받아온 후, map을 사용해서 여러 개의 todoListItem 컴포넌트를 변환해줌.

## 프로젝트에 필요한 라이브러리
<pre><code>
$ yarn create react-app todo-app
$ cd todo-app
$ yarn add node-sass classnames react-icons
</code></pre>
- node-sass : sass사용
- classname : 조건부 스타일링을 편하게 하기 위해서
- react-icons : 리액트에서 아이콘을 사용하는 라이브러리 (https://react-icons.github.io/)
- display flex 속성을 위해서 연습 : https://flexboxfroggy.com/#ko
- 리액트 개발자 도구 : 크롬 웹 스토어에서 React Developer Tools 검색 => 설치 
