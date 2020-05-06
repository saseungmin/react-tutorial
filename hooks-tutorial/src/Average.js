import React,{useState,useMemo,useCallback,useRef} from 'react';

const getAverage = numbers => {
    console.log("평균값 계산");
    if(numbers.length === 0)return 0;
    const sum = numbers.reduce((a,b) => a+b);
    return sum / numbers.length;
}


const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null); //ref 값 기본값 설정

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    },[]); //처음 랜더링될 때만 함수 생성
    const onInsert = useCallback(e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus(); // 등록버튼 누른뒤 input 태그 focus
    },[number,list]); //number, list 가 바뀌었을 떄만 함수 생성

    const avg = useMemo(() => getAverage(list), [list]); // list 값이 변경될때만 실행
    return (
        <div>
            <input value={number} onChange={onChange} ref = {inputEl} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value,index) => (<li key={index}>{value}</li>))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    );
};

export default Average;