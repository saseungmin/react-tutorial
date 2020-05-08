import React,{useState,useRef, useCallback} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {

  const [todos, setTodos] = useState([
    {
      id : 1,
      text : '리엑트',
      checked : true
    },
    {
      id : 2,
      text : 'Node.js',
      checked : true
    },
    {
      id : 3,
      text : 'Mongo.db',
      checked : false
    }
  ])

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo => todo.id === id ? {...todo, checked:!todo.checked} : todo)
      );
    },[todos],
  )


  // ref는 단지 값을 넘긴다
  // 때문에 랜더링되지 않는다.(랜더링이 필요하지 않는 경우만 사용)
  const nextId = useRef(4);

  //처음 랜더링 될때만 (재사용)
  const onInsert = useCallback(
    text => {
      const todo = {
        id : nextId.current,
        text,
        checked :false,
      };
      setTodos(todos.concat(todo));
      nextId.current +=1;
    },[todos],
  )

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },[todos],
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
