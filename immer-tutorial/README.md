# immer를 사용하여 불변성 유지하기
## 1. immer 설치
<pre><code>
$ yarn add immer
</code></pre>

## 2. immer 사용법
- 첫 번째 파라미터는 수정하고 싶은 상태.
- 두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수.
- 두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, <code>produce</code>함수가 불변성 유지를 대신해 주면서 새로운 상태를 생셩해 준다.
<pre><code>
import produce from 'immer';
setForm(produce(form, draft => {
    draft[name] = value;
})
);
</code></pre>
- immer 사용시 객체 안에 있는 값을 <b>직접</b> 수정하거나, 배열에 직접적인 변화를 일으키는 <code>push</code>,<code>splice</code> 사용해도 된다.
- but, immer를 사용한다고 무조건 간결해지는 것은 아니기 때문에 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분.

### 2.1 함수형 업데이트 immer
- immer에서 제공하는 <code>produce</code> 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환한다.
<pre><code>

produce(draft => {
       draft[name] = value;
})

</code></pre>