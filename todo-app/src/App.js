import React,{useState,useRef,useReducer,useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';


// dummy 값
function createBulkTodos(){
  const array = [];
  for(let i=1; i<= 2500; i++){
    array.push({
      id : i,
      text : `할 일 ${i}`,
      checked : false
    })
  }
  return array;
}

// useReducer 사용해서 최적화 하기
function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT' : // 새로 추가
      // {type : 'INSERT' , todo : {id : 1, text:'todo',checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE' :
      // {type : 'REMOVE' , id : 1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE' :
      // {type : 'TOGGLE' , id : 1}
      return todos.map(todo => todo.id === action.id ? {...todo, checked : !todo.checked } : todo)
    default :
      return todos;
    }
}

const App = () => {
  // useState 로 성능 최적화시키기
  //const [todos, setTodos] = useState(createBulkTodos);

  // useReducer 로 성능 최적화시키기
  // 두 번째 파라미터에 초기 상태 넣어준다.
  // 세 번째 파라미터에 초기 상태를 만들어 주는 함수인 createBulkTodos를 넣어 주었다.
  // 이러면 맨 처음 렌더링 될때만 함수 호출
  const [todos, dispatch] = useReducer(todoReducer,undefined,createBulkTodos);

  const onToggle = useCallback(id => {
      // useState의 함수형으로 최적화
      // setTodos(todos =>
      //   todos.map(todo => todo.id === id ? {...todo, checked:!todo.checked} : todo)
      // );

       // useReducer 
       dispatch({type : 'TOGGLE' , id });
    },[]
  )


  // ref는 단지 값을 넘긴다
  // 때문에 랜더링되지 않는다.(랜더링이 필요하지 않는 경우만 사용)
  const nextId = useRef(2501);

  //처음 랜더링 될때만 (재사용)
  const onInsert = useCallback(text => {
      const todo = {
        id : nextId.current,
        text,
        checked :false,
      };
      // useState의 함수형으로 최적화
      // 두 번째 파라미터로 넣는 배열에 [todos]를 넣지 않아도된다.
      //setTodos(todos => todos.concat(todo));

      // useReducer 최적화
      dispatch({type : 'INSERT' , todo });
      nextId.current +=1;
    },[]
  )

  const onRemove = useCallback(id => {
      // useState의 함수형으로 최적화
      // setTodos(todos => todos.filter(todo => todo.id !== id));
      // useReducer 
      dispatch({type : 'REMOVE' , id });
    },[]
  )
  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    </div>
  );
};

export default App;
