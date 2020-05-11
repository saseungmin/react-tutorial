# 리액트 라우터로 SPA 개발하기

## 1. SPA(Single Page Application)란?
- 웹에서 제공하는 정보가 많기 때문에 새로운 화면을 보여 주어야 할 때마다 서버에서 모든 뷰를 준비하면 성능상 문제가 발생할 수 있다.
- 그래서 리액트 같은 라이브러리 혹은 프레임워크를 사용해서 뷰 렌더링을 사용자의 브라우저가 담당하도록 한다.
- 새로운 데이터가 필요하면 서버 API를 호출하여 필요한 데이터만 새로 불러와 애플리케이션에서 사용할 수게 한다.
- 다른 주소에 다른 화면을 보여주는 것을 <b>라우팅</b>라고 한다.
> 리액트 라우팅 라이브러리에는 리액트 라우터, 리치 라우터, Next.js등 있다.

### 1.1 SPA 단점
- 앱 규모가 커지면 자바스크립트 파일이 너무 커진다.
> but. 코드 스틀리팅(code splitting)을 사용하여 라우트 별로 파일들을 나누어서 트래픽과 로딩 속도를 개선할 수 있다.
- 자바 스크립트를 실행하지 않는 일반 크롤러에서는 페이지의 정보를 제대로 수집해 가지 못한다는 단점.
> but. 서버 사이드 렌더링(server-side rendering)으로 해결.

## 2. 기본적인 사용법
- 리액트 라우터 라이브러리 설치
<pre><code>
$ yarn add react-router-dom
</code></pre>
- 리액트 라우터 적용 (src/index.js)
<pre><code>
  // 웹 애플리케이션에 있는 HTML5의 history API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고
  // 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해준다.
    < BrowserRouter>
        < App/>
    < /BrowserRouter>

</code></pre>

### 2.1 Route 컴포넌트로 특정 주소에 컴포넌트 연결
- exact는 <code>/about</code> , <code>/</code> 경로가 겹치는 상황에서 <code>exact={true}</code> 를 하면 같이 안보이게 된다.
<pre><code> 

< Route path="주소규칙" component={보여 줄 컴포넌트} exact={true}/> 

// 여려개의 path 지정할 때
< Route path={['주소규칙','주소규칙']} component={보여 줄 컴포넌트} exact={true}/> 

// component 대신 render를 사용해 보여주고 싶은 JSX를 넣어 줄 수 있다.
< Route path="/profiles" exact render={() => <div>사용자를 선택해 주세요.</div>}/>

</code></pre>

### 2.2 Link 컴포넌트로 다른 주소에 이동
- a 태그 같은 개념 but, a태그 사용시 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태를 모두 날려 버리게 된다.
<pre><code> < Link to="주소">내용< /Link> </code></pre>

## 3. URL 파라미터와 쿼리
### 3.1 URL 파라미터
<pre><code> 
// App.js
< Link to="/profiles/seungmin">seungmin< /Link>
< Route path="/profiles/:username" component={Profile} />
// profile.js
const Profile = ({match}) => {
    const {username} = match.params; //params로 값을 받을 수 있다.
    const profile = data[username];
}
</code></pre>

### 3.2 URL 쿼리
- URL 쿼리는 넘어올 때 문자열도 되어있다.
- 그래서 안의 값을 읽어올려면 객체 형태로 변환해 주어야 한다.
- qs 쿼리 문자열을 객체로 변환
<pre><code> 
$ yarn add ps
// About.js 확인
생략
</code></pre>
- 넘어 올때 문자열이기 때문에 숫자는 <code> parseInt</code> 를 사용해야하고 <code>boolean</code>  타입은 <code>"true" === "true"</code>  처럼 확인한다.

## 4. 서브 라우트
- 라우트 내부에 또 라우트를 정의하는 것.
- 라우트로 사용되고 있는 컴포넌트의 내부에 <code>Route</code> 컴포넌트를 또 사용한다.

## 5. 리액트 라우터 부가 기능
### 5.1 history
- 이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있다.
- ex) 뒤로가기, 로그인 화면 전환, 다른 페이지 이탈
- <code>HistorySample.js</code> 참고
### 5.2 withRouter
- HoC(Higher-order Component)
- 라우트로 사용된 컴포넌트가 아니어도 <code>match</code>, <code>location</code>, <code>history</code> 객체를 접근할 수 있게 해 준다.
- <code>withRouterSample.js</code> 참고
### 5.3 Switch
- <code>Switch</code> 컴포넌트는 여러 <code>Router</code>를 감싸사 그 중 일치하는 단 하나의 라우트만을 렌더링시켜 준다.
<pre><code>

      < Switch>
          < Route path="/" component={Home} exact={true}/>
          < Route path={["/about",'/info']} component={About}/>      
          < Route path="/profiles" component={Profiles}/>
          < Route path="/history" component={HistorySample} />
          < Route //path를 따로 정의하지 않으면 모든 상황에서 렌더링됨
            render = {({location}) => (
              < div>
                < h2>이 페이지는 존재하지 않습니다:< /h2>
                < p>{location.pathname}< /p>
              < /div>
            )} />
      < /Switch>

</code></pre>

### 5.4 NavLink
- <code>Link</code> 와 비슷.
- 현재 경로와 <code>Link</code>에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS클래스를 적용할 수 있다.
- <code>NavLink</code>에서 링크가 활성화 되었을 때 스타일 적용할 때는 <code>activeStyle</code>값을, CSS클래스를 적용할 때는 <code>activeClassName</code> 값을 <code>props</code>로 넣어 준다.
<pre><code>
< NavLink activeStyle={activeStyle} to="/profiles/seungmin">seungmin< /NavLink>
</code></pre>
