import React, { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect,useSelector,useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';


const CounterContainer = () => {
    // hooks useSelector를 사용하여 리덕스 상태 조회
    const number = useSelector(state => state.counter.number);
    // useDispatch를 사용하여 액션 디스패치하기
    const dispatch = useDispatch();
    // useCallback을 사용해서 리렌더링 방지하기.
    // useDispatch를 사용할땐 useCallback과 같이 사용한다.
    const onIncrease = useCallback(() => dispatch(increase()),[dispatch]);
    const onDecrease = useCallback(() => dispatch(decrease()),[dispatch]);
    return (
      <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
    );
  };
export default CounterContainer;


// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };

// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });
//dispatch를 감싸는 작업이 번거로울 수 있다.
// const mapDispatchToProps = dispatch => ({
//     increase: () => {
//         dispatch(increase());
//     },
//     decrease: () => {
//         dispatch(decrease());
//     }
// });

// bindActionCreators 사용
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       increase,
//       decrease,
//     },
//     dispatch,
//   );

// mapStateToProps, mapDispatchToProps에 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달된다.
// mapStateToProps는 state를 파라미터로 받아온다. 이 값은 현재 스토어가 지니고 있는 상태를 가리킨다.
// mapDispatchToProps는 store의 내장 함수 dispatch를 파라미터로 받아온다.
//export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

//익명 함수 형태로도 사용가능.
// export default connect(
//     state => ({
//         number:state.counter.number
//     }),
//     dispatch => ({
//         increase: () => {
//             dispatch(increase());
//         },
//         decrease: () => {
//             dispatch(decrease());
//         }
//     })
// )(CounterContainer);

// 객체 형태로 넣어주면 더 쉽게 사용가능
// export default connect(
//     state => ({
//         number:state.counter.number
//     }),
//     {
//         increase,
//         decrease,
//     }
// )(CounterContainer);
