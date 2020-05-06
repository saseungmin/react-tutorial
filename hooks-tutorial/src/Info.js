import React,{useReducer, useEffect} from 'react';
import useInputs from './useInputs';


// function reducer(state,action){
//     return{
//         ...state,
//         [action.name] : action.value
//     };
// }


const Info = () => {
    // const [name, setName] =useState('');
    // const [nickName, setNickName] = useState('');
    // const [state,dispatch] = useReducer(reducer,{
    //     //기본값
    //     name : '',
    //     nickName : ''
    // })
    const [state, onChange] = useInputs({
        name : '',
        nickName : ''
    })

    const {name,nickName} =state;

    //어떤 값도 사용가능
    // const onChange = e => {
    //     //setName(e.target.value);
    //     dispatch(e.target);
    // }

    // const onChangeNickName = e =>{
    //     setNickName(e.target.value);
    // }

    useEffect(() => {
        console.log("effect");
        console.log({
            name, nickName
        })
        return () =>{
            //ex) 업데이트 직전값 출력
            console.log('cleanUp');
            console.log(name);
        }
    },[])
    
    

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}></input>
                <input name="nickName" value={nickName} onChange={onChange}></input>
            </div>
            <div>
                <div>
                    <b>이름 : </b> {name}
                </div>
                <div>
                    <b>닉네임 : </b> {nickName}
                </div>
            </div>
        </div>
    );
};

export default Info;