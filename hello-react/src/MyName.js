import React, {Component} from 'react';

//클래스 컴포넌트
// class MyName extends Component{
//     // 기본값 설정 할 수 있는 defaultProps
//     // static defaultProps ={
//     //     name : '기본이름'
//     // }

//     render(){
//         return(
//             // 자신이 받아온 props 값은 this. 키워드로 조회 가능
//             <div>
//                 안녕하세요. 제 이름은 <b>{this.props.name}</b> 입니다.
//             </div>
//         )
//     }
// }
// 단순히 props 만 받아와서 보여주기만 하는 컴포넌트의 경우 사용
// 함수형 컴포넌트
// 차이점은 state와 LifeCycle이 빠져있어서 컴포넌트 초기 마운트가 아주 미세하게 빠르고, 메모리 자원을 덜 사용한다. (but, 미세한 차이)
const MyName = ({name}) => {
    return(
        <div>

            안녕하세요! 제 이름은 <b>{name}</b> 입니다.
        </div>

)
}

// 기본값 설정 또 다른 방법
MyName.defaultProps = {
    name : '기본이름'
};

export default MyName;