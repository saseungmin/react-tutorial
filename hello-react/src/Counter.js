import React, {Component} from 'react';


// 카운터 4일때 에러 호출
// 개발 모드에서 제공해주는 기능
// 프로덕션에서는 이 화면은 나타나지 않는다.
// componentDidCatch를 통해서 자식 컴포넌트에서 발생한 에러를 잡을 수 있다.
const Problematic = () => {
    throw (new Error('error 났다'));
    return (
        <div>

        </div>
    );
}



class Counter extends Component{
    // class fields가 먼저 실행되고, 그 다음에 constructor에서 설정된 것이 나온다.
    // state 정의 할 때는 class fields 문법을 사용
    state ={
        number : 0,
        // setState는 객체의 깊숙한 곳까지 확인 못한다. (객체 안에 객체 업데이트 되지 않는다.)
        // foo 객체가 바뀌어 버린다.
        foo : {
            bar:0,
            foobar:2
        }
    }
    
    constructor(props){
        super(props);
        console.log('constructor');
    }

    componentWillMount(){
        console.log('componentWillMount(deprecated)');
    }

    componentDidMount(){
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState){
        //5의 배수라면 리렌더링 하지 않음
        console.log('shouldComponentUpdate');
        if(nextState.number % 5 === 0) return false;
        return true;
    }

    componentWillUpdate(nextProps,nextState){
        console.log('componentWillUpdate');
    }
    componentDidUpdate(preProps, prevState){
        console.log('componentDidUpdate');
    }

    // 컴포넌트 자신의 render 함수에서 에러가 발생해버리는것은 잡아낼 수는 없지만,
    // 그 대신에 컴포넌트의 자식 컴포넌트 내부에서 발생하는 에러는 잡아낼 수 있다.
    componentDidCatch(error,info){
        this.setState({
            error : true
        });
    }

    // 메소드 작성 방법 1
    handleIncrease =() => {
        // state에 있는 값을 바꾸기 위해서는, this.setState를 무조건 거쳐야한다.
        // setState는 객체로 전달되는 값만 업데이트를 해준다.
        // 1. this. 를 한번더 사용해야한다.
        // this.setState({
        //     number: this.state.number + 1
        // });
        // 2. 조금 더 나은 문법
        // this.setState(
        //     (state) => ({
        //         number: state.number +1
        //     })
        // )
        // 3. 비구조화 할당 방법   
        this.setState(
            ({number}) => ({
                number : number + 1
            })
        )
        // 4. 덜 작성하고 싶으면
        // const {number} = this.state;
        // this.setState({
        //     number: number +1
        // })
    }
    handleDecrease = () => {
        const {number} = this.state;
        this.setState({
            number: number - 1
        })
    }

    render(){
        console.log('render');

        if(this.state.error) return (<h1>에러 발생 !</h1>)
        return(
            // 이벤트이름 설정 할 때 camelCase 설절 필수!!
            // 절달해주는 값은 함수여야 한다! ex) {this.handleIncrease()} => 안됨! 무한반복현상
            <div>
                <h1>카운터</h1>
                <div>값 : {this.state.number}</div>
                { this.state.number === 4 && <Problematic/>}
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>

        );
    }
}

export default Counter;

// class Counter extends Component{
//     // class fields가 먼저 실행되고, 그 다음에 constructor에서 설정된 것이 나온다.
//     // class fields 사용하지 않을 때
//     constructor(props){
//         //컴포넌트를 상속했으며, 우리가 constructor를 작성하게 되면 기존 클래스 생성자를 덮어쓰게 된다.
//         super(props);
//         // state 설정을 해준다.
//         this.state ={
//             number : 0
//         }
//         //함수가 버튼의 클릭이벤트로 전달이 되는 과정에서 "this"와의 연결이 끊겨버리기 때문에 필요
//         this.handleIncrease = this.handleIncrease.bind(this);
//         this.handleDecrease = this.handleDecrease.bind(this);
//     }

//     // 메소드 작성 방법 2
//     // 버튼에서 클릭 이벤트가 발생 했을 때, this가 undefined로 나타남.
//     handleIncrease() {
//         this.setState({
//           number: this.state.number + 1
//         });
//       }
    
//       handleDecrease() {
//         this.setState({
//           number: this.state.number - 1
//         });
//       }


//     render(){
//         return(
//             <div>
//                 <h1>카운터</h1>
//                 <div>값 : {this.state.number}</div>
//                 <button onClick={this.handleIncrease}>+</button>
//                 <button onClick={this.handleDecrease}>-</button>
//             </div>

//         );
//     }
// }

// export default Counter;