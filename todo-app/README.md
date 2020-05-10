# ※ TodoList 만들어보기

# 1.기능
- TodoTemplate : 화면을 띄어주는 제일 큰 틀 / children으로 내부 JSX를 props로 받아와 렌더링 해준다.
- TodoInsert : 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 input의 상태를 관리
- TodoListItem : 각 할 일 항목에 대한 정보를 보여주는 컴포넌트. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여줌.
- TodoList : todos 배열을 받아온 후, map을 사용해서 여러 개의 todoListItem 컴포넌트를 변환해줌.

# 2.프로젝트에 필요한 라이브러리
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

# 3. 컴포넌트 성능 최적화하기
## 3.1 느려지는 원인
- 자신이 전달받은 <code>props</code>가 변경될 때
- 자신의 <code>state</code>가 바뀔 때
- 부모 컴포넌트가 리렌더링될 때
- <code>forceUpdate</code> 함수가 실행될 때

## 3.2 최적화 하기 전
- 데이터를 2500개를 넣으니 확실히 느려짐을 확인할 수 있었다. 
- 할 일 삭제하는데 걸리는 시간은 대략 <b>0.6초</b> 정도였다.

## 3.3 React.memo로 컴포넌트 성능 최적화
- React.memo(클래스 컴포넌트 : shouldComponentUpdate)는 컴포넌트의 <code>props</code>가 바뀌지 않으면, 리렌더링하지 않도록 설정하여 최적화 시킬 수 있다.
<pre><code>export default React.memo(TodoList);</code></pre>

## 3.4 useState, useReducer를 사용한 최적화 
- <code>todos</code> 배열이 업데이트되면 <code>onToggle</code>과 <code>onRemove</code>, <code>onInsert</code> 함수도 새롭게 바뀐다.
### 3.4.1 useState 
- <code>setTodos</code>를 사용할때 <b>함수형 업데이트</b>로 사용
- <code>useCallback</code>을 사용할 때 두 번째 파라미터로 넣는 배열을 안 넣어도 된다.
<pre><code>
  const onToggle = useCallback(id => {
       //useState의 함수형으로 최적화
       setTodos(todos =>
         todos.map(todo => todo.id === id ? {...todo, checked:!todo.checked} : todo)
       );
    },[]
  )

</code></pre>

### 3.4.2 useReducer
- <code>useReducer</code> 두 번째 파라미터에 초기 상태를 넣어준지만, 이 경우 두 번째 파라미터에 <code>undefinded</code>를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 함수를 넣어준다. 이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 함수가 호출된다.
- 단점은 기존 코드 수정이 많아진다.
- 장점은 상태를 업데이트 하는 로직을 컴포넌트 바깥에다가 둘 수 있다.
<pre><code>  const [todos, dispatch] = useReducer(todoReducer,undefined,createBulkTodos);</code></pre>

- 이렇게 최적화를 시키면 할 일(데이터 한개) 삭제하는데 걸리는 시간은 대략 <b>0.059초</b> 정도로 줄어들었다.

## 3.5 react-virtualized 사용한 렌더링 최적화
- 초기 데이터가 화면에 보이는 것은 총 9개 뿐인데 2500개를 다 불러와야하는 비효율적인 문제가 존재.
- <code>react-virtualized</code>를 사용하면 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않는다.
- 스크롤 내릴시 만큼만 자연스럽게 렌더링된다.
<pre><code>
$ yarn add react-virtualized
</code></pre>
- <code>TodoList.js</code>를 수정
<pre><code>
import {List} from 'react-virtualized';
// userCallback 함수 추가
    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const todo = todos[index];
            return(
                <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style}/>
            )
        },
        [onRemove,onToggle,todos] // onRemove,onToggle,todos 가 변경될때만 리렌더링
    );
    
// return에 List 추가
        <List className="TodoList"
            width ={512} //전체 크기
            height = {513} // 전체 높이
            rowCount = {todos.length} //항목 개수
            rowHeight = {57} //항목 높이
            rowRenderer = {rowRenderer} // 항목을 렌더링할 때 쓰는 함수 props
            list = {todos} //배열
            style ={{outline :'none'}} //List에 기본 적용되는 outline 스타일 제거
        />
</code></pre>

- <code>TodoListItem.js</code> 수정 
<pre><code>
// 컴포넌트 사이사이에 테두리를 쳐주고, 홀수/ 짝수 번째 항목에 다른 색상을 설정하기 위함
        <div className="TodoListItem-virtualized" style={style}>
          // 생략
        </div>
        
</code></pre>
- react-virtualized를 사용했더니 <b>0.005초</b> 까지 줄어들었다!!
