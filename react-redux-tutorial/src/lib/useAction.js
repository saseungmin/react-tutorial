import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';

// 액션 생성 함수를 액션을 디스패치하는 함수로 변환해 준다.
// 액션 생성 함수를 사용하여 액션 객체를 만들고, 이를 스토어에 디스패치하는 작업을 해 주는 함수를 자동으로 만들어 준다.
// 첫 번째 파라미터는 액션 생성 함수로 이루어진 배열.
// 두 번째 파라미터는 deps 배열이며, 이 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만든다.
export default function useAction(action, deps){
    const dispatch = useDispatch();
    return useMemo(
        ()=>{
            if(Array.isArray(action)){
                return action.map(a => bindActionCreators(a,dispatch));
            }
            return bindActionCreators(action,dispatch);
        },
        deps ? [dispatch,...deps] : deps
    );
}