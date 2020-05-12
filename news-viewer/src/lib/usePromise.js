import { useState, useEffect } from "react";


// usePromise의 의존 배열 deps를 파라미터로 받아온다.
// deps는(선택된 카테고리 값이 넘어온다.) useEffect의 의존 배열로 설정
// promiseCreator는 return한 값
export default function usePromise(promiseCreator, deps){
    // 대기 중/완료/실패에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }
        process();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },deps)
    return [loading,resolved,error];
}