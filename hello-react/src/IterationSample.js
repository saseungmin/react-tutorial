import React, {useState} from 'react';

const IterationSample = () => {
    const [names,setNames] = useState([
        {id :1,text:'눈사람'},
        {id :2,text:'얼음'},
        {id :3,text:'눈'},
        {id :4,text:'바람'},
    ]);
    const [inputText,setInputText] = useState('');
    const [nextId, setNextId] = useState(5);
    //['눈사람','얼음','눈','바람'];
    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        const nextNames = names.concat({
            id : nextId,
            //input value 값
            text : inputText
        });
        console.log(nextNames);
        setNextId(nextId + 1);
        // name 리스트 값 변경(불변성 유지,concat)
        setNames(nextNames);
        setInputText("");
    }
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
    }
    const nameList = names.map((name) => <li key={name.id} onDoubleClick={() => onRemove(name.id)}>{name.text}</li>);
    return (
        <>
        <br />
        <input value={inputText} onChange={onChange} />
        <button onClick={onClick}> 추가 </button>
        <ul>{nameList}</ul>
        </>
    );
};

export default IterationSample;