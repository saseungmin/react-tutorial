import {createAction , handleActions} from 'redux-actions';
import  produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋값 변경
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/ 해제 함
const REMOVE = 'todos/REMOVE'; // todo를 제거

// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// });
// export const insert = (text) => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false,
//   },
// });
// export const toggle = (id) => ({
//   type: TOGGLE,
//   id,
// });
// export const remove = (id) => ({
//     type: REMOVE,
//     id,
//   });

// createAction 사용
export const changeInput = createAction(CHANGE_INPUT,input => input);

let id = 3; // insert가 호출될때 마다 1씩 증가
export const insert = createAction(INSERT, text => ({
    id : id++,
    text,
    done: false,
}));

export const toggle = createAction(TOGGLE, id => id);

export const remove = createAction(REMOVE, id => id);

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo),
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }


// handleActions로 리듀서를 재작성
// action.payload 값으로 통일
// 햇갈릴수 있기 때문에 비구조화 할당 문법 사용
// immer 사용해서 불변성 유지하기
const todos = handleActions(
    {
        //[CHANGE_INPUT] : (state, {payload : input}) => ({...state,input:input}),
        [CHANGE_INPUT] : (state, {payload : input}) => 
            produce(state,draft => {
                draft.input = input;
            }),
        // [INSERT] : (state,{payload : todo}) => ({
        //     ...state,
        //     todos: state.todos.concat(todo)
        // }),
        [INSERT] : (state,{payload : todo}) => 
            produce(state,draft => {
                draft.todos.push(todo);
            }),
        // [TOGGLE] : (state, {payload :id}) => ({
        //     ...state,
        //     todos: state.todos.map(todo => 
        //         todo.id === id ? {...todo,done:!todo.done} : todo
        //         )
        //     }),
        [TOGGLE] : (state, {payload :id}) => 
            produce(state,draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        // [REMOVE] : (state,{payload :id}) => ({
        //     ...state,
        //     todos : state.todos.filter(todo => todo.id !== id)
        // })
        [REMOVE] : (state,{payload :id}) => 
            produce(state,draft => {
                const index = draft.todos.findIndex(todo => todo.id === id); 
                draft.todos.splice(index,1);
            })
    },initialState
)
export default todos;
