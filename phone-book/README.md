# ※ phone-book

### - 주석 확인

## 1. input 값이 여러개일때
> [e.target.name] : 넘어오는 name 값을 키로 사용 할 수 있게 한다. []   
> Computed property names 문법
<pre><code>
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
</code></pre>

## 2. 부모 컴포넌트에게 정보 전달하기
<pre><code>
// file: src/components/PhoneForm.js
this.props.onCreate(this.state);
</code></pre>

## 3. 불변성 유지
> 리액트에서는 state 내부의 값을 직접적으로 수정하면 안된다.   
> push, splice, unshift, pop 같은 내장함수는 배열 자체를 직접 수정하게 되므로 적합하지 않다.   
> 기존의 배열에 기반하여 새 배열을 만들어내는 함수인 concat, slice, map, filter 사용.   
> ### 리액트에서 불변성 유지가 중요한 이유
>> 불변성을 유지해야 리액트에서 모든것들이 필요한 상황에 리렌더링 되도록 설계 할 수 있고, 그렇게 해야 나중에 성능도 최적화 할 수 있기 때문.

## 4. 데이터 필터링 시 유의사항
> input에 입력을 했을 때 업데이가 필요한 것은 오직 input 뿐이다.   
> 하지만, App 컴포넌트의 상태가 업데이트 되면, 컴포넌트의 리렌더링이 발생하게 되고, 컴포넌트가 리렌더링 되면 그 컴포넌트의 자식 컴포넌트도 리렌더링 된다.   
> 때문에, Virtual DOM에 렌더링 하는 자원을 아끼기 위해서 shouldComponentUpdate LifeCycle API를 사용한다.   
<pre><code>

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }
 
</code></pre>
> #### 불변성이 중요한 이유는 바로바로 비교할 수 있기 때문!

>> 자세한 사항: 각각 주석에

<hr>
※ 정보 출처 : https://velopert.com/category/dev-log/tech-log/react-js
