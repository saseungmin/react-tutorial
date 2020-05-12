# ※ 외부 API를 연동하여 뉴스 뷰어 만들기

## 1. 비동기 작업 처리 방법
### 1.1 Promise
- 콜백 지옥 같은 코드가 형성되지 않게 하는 방안으로 ES6에 도입된 기능.
- Promise에서 <code>resolve</code> 된 값은 <code>.then</code>을 통해 받아 올 수 있음.
- <code>.then</code>에서 리턴하면 또 다음 <code>.then</code>으로 처리 가능.
- 도중에 에러가 발생한다면 <code>.catch</code>를 통해 알 수 있음.
### 1.2 async/await 
- Promise를 더욱 쉽게 사용할 수 있도록 해 주는 ES2017(ES8) 문법.
- 함수 앞부분에 <code>async</code> 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞부분에 <code>await</code> 키워드를 사용한다.

## 2. axios로 API 호출해서 데이터 받아오기
- 자바스크립트 HTTP 클라이언트
- HTTP요청을 Promise 기반으로 처리
- <code>axios</code> 라이브러리 설치
<pre><code>
$ yarn add axios
</code></pre>
- <code>axios</code>로 호출
<pre><code>
// .then을 통해 비동기적으로 확인
axios.get('API URL').then(response => {
     setData(response.data);
});
</code></pre>
<pre><code>
//async/await 적용
const onClick = async() => {
  try {  
    const response = await axios.get('API URL');
    setData(response.data);
  } catch (error) {
    console.log(error);
  }
} 

</code></pre>
## 3. 뷰어 UI 만들기
- <code>styled-components</code>를 사용해 스타일을 자바스크립트 파일에 내장시켜 컴포넌트에 스타일을 적용시킨다.
<pre><code>
$yarn add styled-components
</code></pre>

## 4. 데이터 연동하기
- <code>useEffect</code>를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청.
- 📌 주의할 점! : <b><code>useEffect</code>에 등록하는 함수에 <code>async</code>를 붙이면 안된다.</b> <code>useEffect</code>에서 반환해야 하는 값은 <b>뒷정리 함수</b>이기 때문.
- 따라서 <code>useEffect</code> 내부에서 <code>async/await</code>를 사용할려면, 함수 내부에 <code>async</code> 키워드가 붙은 또 다른 함수를 만들어서 사용해 주어야 한다.
<pre><code>
  useEffect(() => {
      // async를 사용하는 함수 따로 선언
      const fetchData = async () => {
          try{
              const query = category === 'all' ? '' : `&category=${category}`;
              const response = await axios.get(
                  `API URL`
                  );
              setArticles(response.data.articles); 
          }catch(e){
              console.log(e);
          }   
      };
      fetchData();
      //[category] 가 반환 된다.
  },[category])
</code></pre>

## 5. 리액트 라우터 적용
- 리액트 라우터 설치
<pre><code>
$yarn add react-router-dom
</code></pre>
- <code>index.js</code>에 리액트 라우터 적용
<pre><code>
ReactDOM.render(
  < BrowserRouter>
    < App />
  < /BrowserRouter>,
  document.getElementById('root')
);
</code></pre>
- 카테고리 별로 Route path 지정 (App.js)
<pre><code>
// /:category? => 물음표 문자가 들어가 있을시 선택적인 의미로 있을 수도 있고 없을 수도 있다는 뜻.
< Route path="/:category?" component={NewsPage}/>
</code></pre>
- NavLink 사용하기
<pre><code>
// Categories.js
const Category = styled(NavLink)` 스타일 주는 곳`;
// NavLink 적용
< Category key={c.name} activeClassName="active" exact={c.name === 'all'} 
to={c.name === 'all' ? '/' :`${c.name}`}>< b>{c.text}< /b>< /Category>
</code></pre>

## 6. 커스텀 Hook 만들기
- 다양한 곳에서 사용할 수 있는 유틸 함수를 간결하게 만든다.
- <code>usePromise</code>의 의존 배열 <code>deps</code>를 파라미터로 받아온다.
- <code>deps</code>는(선택된 카테고리 값이 넘어온다.) <code>useEffect</code>의 의존 배열로 설정
- <code>promiseCreator</code>는 <code>return axios.get('')</code>한 값
- // eslint-disable-next-line react-hooks/exhaustive-deps => ESLint 규칙을 무시하도록 주석 설정
<pre><code>
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
</code></pre>

