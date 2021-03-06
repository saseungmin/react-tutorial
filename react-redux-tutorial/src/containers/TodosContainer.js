import React, { useCallback } from 'react';
import {connect, useDispatch,useSelector} from 'react-redux';
import {changeInput,insert,remove,toggle} from '../modules/todos';
import Todos from '../components/Todos';
import useActions from '../lib/useAction';

// hooks 사용해서 만들기
const TodosContainer = () => {
    // 비구조화 할당 문법 사용
    const {input,todos} = useSelector(({todos}) => ({
        input : todos.input,
        todos : todos.todos
    }));
    // const dispatch = useDispatch();
    // const onChangeInput = useCallback(input => dispatch(changeInput(input)),[dispatch]);
    // const onInsert = useCallback(text => dispatch(insert(text)),[dispatch]);
    // const onToggle = useCallback(id => dispatch(toggle(id)),[dispatch]);
    // const onRemove = useCallback(id => dispatch(remove(id)),[dispatch]);
    
    // useActions 유틸 Hook을 만들어서 사용하기.
    const [onChangeInput,onInsert,onToggle,onRemove] = useActions(
        [changeInput,insert,toggle,remove],[]
    )

    return(
        <Todos input={input} todos={todos} onChangeInput={onChangeInput} onInsert={onInsert} onToggle={onToggle} onRemove={onRemove} />
    )
}

// connect 함수인 경우 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면, 리렌더링이 자동으로 방지되어 성능이 최적화 된다.
// 반면, useSelector를 사용하여 리덕스 상태를 조회했을 때는 자동으로 이루어지지 않으므로 React.memo를 컨테이너 컴포넌트에 사용해 줘야한다.
export default React.memo(TodosContainer);
// hooks 사용전
// const TodosContainer = ({
//     input, // 인풋에 입력되는 텍스트
//     todos, // 할 일 목록이 들어 있는 객체
//     changeInput,
//     insert,
//     toggle,
//     remove,
// }) => {
//     return (
//         <div>
//             <Todos input={input} todos={todos} onChangeInput={changeInput} onInsert={insert} onToggle={toggle} onRemove={remove}/>     
//         </div>
//     );
// };

// export default connect(
//     // 비구조화 할당을 통해 todos를 분리하여
//     // state.todos.input 대신 todos.input을 사용
//     ({todos}) => ({
//         input : todos.input,
//         todos : todos.todos,
//     }),
//     {
//         changeInput,
//         insert,
//         remove,
//         toggle,
//     },
// )(TodosContainer);