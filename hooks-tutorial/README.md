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
