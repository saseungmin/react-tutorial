import React, { useRef, useState, useCallback } from 'react';
import produce from 'immer';



const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({name : '',username : ''});
  const [data, setData] = useState({
    array : [],
    uselessValue : null
  });

  const onChange = useCallback(e => {
    const {name,value} = e.target;
    setForm(
    //   {
    //    ...form,
    //    [name] : [value]
    // }
    // 첫번째 파라미터는 수정하고 싶은 상태 /두번째 파라미터는 상태를 어떻게 업데이트 할지 정의하는 함수 
    // produce(form,draft => {
    //   draft[name] = value;
    // })
    // immer 함수형 업데이트 (첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환)
    produce(draft => {
       draft[name] = value;
    })
  )},[])

  const onSubmit = useCallback(e =>{
    e.preventDefault();
    const info = {
      id : nextId.current,
      name : form.name,
      username : form.username
    };

    setData(
    //   {
    //   ...data,
    //   array : data.array.concat(info)
    // }
    produce(draft => {
      draft.array.push(info);
    })
    );

    setForm({
      name : '',
      username : ''
    });

    nextId.current += 1;
  },[data,form.name,form.username]
  )

  const onRemove = useCallback(id => {
    setData(
    //   {
    //   ...data,
    //   array : data.array.filter(info => info.id !== id)
    // }
      produce(draft => {
        draft.array.splice(draft.array.findIndex(info => info.id === id), 1);
      })

    );
  },[]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="아이디" value={form.username} onChange={onChange} />
        <input name="name" placeholder="이름" value={form.name} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;