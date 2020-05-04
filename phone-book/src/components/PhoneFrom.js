import React,  {Component} from 'react';

class PhoneFrom extends Component{

    // 리액트에서는 state 내부의 값을 직접적으로 수정하면 안된다.
    // 불변성 유지
    // 배열의 push, splice, unshift, pop 같은 배장함수는 배열 자체를 직접 수정하게 되므로 적합하지 않다.
    // 새 배열을 만들어내는 함수 concat, slice, map, filter 같은 함수 사용
    state ={
        name : '',
        phone : ''
    }
    // onChange 이벤트 발생시 실행
    handleChange = (e) => {
        this.setState({
            // 이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어옴.
            // e.target.name 하면 여러개의 name으로 각각을 조회할 수 있다.
            // Computed property names 문법
            // 변수 값을 키로 쓸 수 있게 하는것 []
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        // 원래 이벤트가 해야 하는 작업을 방지(submit 방지)
        e.preventDefault();
        // 상태값을 onCreate를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            name:'',
            phone:''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input placeholder="이름" value={this.state.name} name="name" onChange={this.handleChange} />
                <input placeholder="전화번호" value={this.state.phone} name="phone" onChange={this.handleChange}/>
                <button type="submit">등록</button>
                <h2>{this.state.name} {this.state.phone}</h2>
            </form>
        );
    }
}

export default PhoneFrom;