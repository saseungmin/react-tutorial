import React,{useCallback} from 'react';
import {List} from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {

    //함수를 재사용하고싶을때 useCallback
    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const todo = todos[index];
            return(
                <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style}/>
            )
        },
        [onRemove,onToggle,todos] // onRemove,onToggle,todos 가 변경될때만 리렌더링
    );

    return (
        
        <List className="TodoList"
            width ={512} //전체 크기
            height = {513} // 전체 높이
            rowCount = {todos.length} //항목 개수
            rowHeight = {57} //항목 높이
            rowRenderer = {rowRenderer} // 항목을 렌더링할 때 쓰는 함수 props
            list = {todos} //배열
            style ={{outline :'none'}} //List에 기본 적용되는 outline 스타일 제거
        />
        // <div className="TodoList">
        //     {todos.map(todo => (
        //         <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
        //     ))}
        // </div>
    );
};

// 현재 상황에서는 불필요 (App이 리렌더링되는 유일한 이유는 todos 배열이 업데이트 될때)
// but, App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트 될때 불필요한 리렌더링 가능
// 따라서 미리 최적화 작업 수행
export default React.memo(TodoList);