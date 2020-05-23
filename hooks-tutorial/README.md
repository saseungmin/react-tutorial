# ✔ 함수형 컴포넌트의 hooks
## ✒ useState
- 가장 기본적인 Hook로 함수형 컴포넌트에서 가변적인 상태를 지닐 수 있게 해준다.
- <code>useState</code> 함수의 파라미터에는 상태의 기본값을 넣어준다.
- <code>useState</code> 함수는 호출되면 배열을 반환하는데 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수이다.
<pre>
const Counter = () => {
    const [value,setValue] = useState(0);

    return(
        < div>
            < p> 현재 카운터 값은 < b>{value}< /b>입니다. < /p>
            < button onClick={() => setValue(value+1)}>+1< /button>
            < button onClick={() => setValue(value-1)}>-1< /button>
        < /div>
    )
</pre>

## ✒ useEffect
- 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.
- 클래스형 컴포넌트의 <code>componentDidMount</code>와 <code>componentDidUpdate</code>를 합친 형태랑 같다.
- <code>useEffect()</code>는 값이 업데이트 될 때마다 실행되는데 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행되지 않게 하려면 함수의 <b>두 번째 파라미터로 비어 있는 배열을 넣어 주면 된다.</b>
<pre>
    useEffect(() => {
        console.log("effect");
        console.log({
            name, nickName
        })
    },<b>[]</b>)
</pre>
- 특정 값이 업데이트될 때만 실행하고 싶으면 <b>두 번째 파리미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면된다.</b>
<pre>
useEffect(() => {
    console.log(name);
},<b>[name]</b>)
</pre>
### 🔸 뒷정리하기
- 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떤 작업을 수행하고 싶다면 <code>useEffect</code>에서 뒷정리 함수를 반환해 주어야한다.
<pre>
    useEffect(() => {
        console.log("effect");
        console.log({
            name, nickName
        })<b>
        return () =>{
            //ex) 업데이트 직전값 출력
            console.log('cleanUp');
            console.log(name);
        }</b>
    },[])
</pre>
- 뒷정리 함수가 호출될 떄는 <b>업데이트되기 직전 값을 보여준다.</b>

## ✒ useReducer
- 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수이다.
- 리듀서 함수에서 새로운 상태를 만들 때는 <b>불변성을 지켜야 한다.</b>
<pre>
function reducer(state,action){
    switch (action.type){
        case 'INCREMENT':
            return {value : state.value + 1};
        case 'DECREMENT':
            return {value : state.value -1};
        default :
        //아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}
const Counter = () => {
    const [state, dispatch] = useReducer(reducer,{value : 0});
    return (
        < div>
            < p>
                현재 카운터 값은 < b>{state.value}< /b>입니다.
            < /p>
            < button onClick={() => dispatch({type : 'INCREMENT'})}>+1< /button>
            < button onClick={() => dispatch({type : 'DECREMENT'})}>-1< /button>

        < /div>
    );
};
</pre>
- <code>useReducer</code>의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 준다.
- <code>state</code>값과 <code>dispatch</code> 함수를 받아오는데 <code>state</code>는 현재 가리키고 있는 상태이고, <code>dispatch</code>는 액션을 발생키기는 함수이다.
- <code>useReducer</code>를 사용했을 때 가장 큰 장점은 <b>컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 점이다.</b>

## ✒ useMemo
- <code>useMemo</code>를 사용하면 함수형 컴퍼넌트 내부에서 발생하는 연산을 최적화할 수 있다.
- 렌더링하는 과정에서 <b>특정 값이 바뀌었을 때만 연산을 실행</b>하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.
<pre>
const getAverage = numbers => {
    console.log("평균값 계산");
    if(numbers.length === 0)return 0;
    const sum = numbers.reduce((a,b) => a+b);
    return sum / numbers.length;
}
// 생략..
const avg = useMemo(() => getAverage(list), [list]); // list 값이 변경될때만 실행
// 생략..
</pre>
## ✒ useCallback
- <code>useMemo</code>와 비슷하고 렌더링 성능을 최적화해야 하는 상황에서 사용된다.
- 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.
<pre>
const onChange = useCallback(e => {
    setNumber(e.target.value);
},[]); //처음 랜더링될 때만 함수 생성
const onInsert = useCallback(e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
},[number,list]); //number, list 가 바뀌었을 떄만 함수 생성
</pre>
- <code>useCallback</code>의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지를 명시하는 배열을 넣는다.
- 빈 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성되고, 배열 안에 값을 넣게 되면 내용일 바뀌거나 새로운 항목이 추가될 때 마다 함수가 생성된다.

## ✒ useRef
- 함수형 컴포넌트에서 <code>ref</code>를 쉽게 사용할 수 있도록 해준다.
<pre>
const Average = () => {
    const inputEl = useRef(null); //ref 값 기본값 설정
    const onInsert = useCallback(e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus(); // 등록버튼 누른뒤 input 태그 focus
    },[number,list]); //number, list 가 바뀌었을 떄만 함수 생성
    // 생략 ..
    return (
        < div>
        // 생략..
            < input value={number} onChange={onChange} ref = {inputEl} />
        < /div>
    )
}
</pre>
- <code>useRef</code>를 사용하여 <code>ref</code>를 설정하면 <code>useRef</code>를 통해 만든 객체 안의 <code>current</code> 값이 실제 엘리먼트를 가리킨다.
- <code>ref</code> 안의 값이 바뀌어도 컴포넌트가 <b>렌더링되지 않는다.</b>(렌더링과 관련되지 않은 값을 관리할 때만 사용)

## ✒ 다른 Hooks
- 다른 개발자가 만든 Hooks도 라이브러리로 설치하여 사용할 수 있다.
- 참고 링크 : https://nikgraf.github.io/react-hooks
- 참고 링크 : https://github.com/rehooks/awesome-react-hooks