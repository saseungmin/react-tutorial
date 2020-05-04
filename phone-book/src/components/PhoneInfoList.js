import React ,{Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component{

    static defaultProps = {
        data : [],
        onRemove : () => console.warn("onRemove not defined"),
        onUpdate : () => console.warn("onUpdate not defined"),
    }

    // App 컴포넌트의 상태가 없데이트 되면, 컴포넌트의 리렌더링이 발생하게 되고, 컴포넌트가 리렌더링되면 그 컴포넌트의 자식 컴포넌트도 리렌더링된다.
    // 때문에 이러한 낭비되는 자원을 아끼기 위해선 shouldComponentUpdate 사용
    shouldComponentUpdate(nextProps, nextState){
        console.log("nextProps",nextProps ,"nextState",nextState);
        // 다음 받아올 data가 현재 data랑 다른 배열일 때 true 로 설정
        return nextProps.data !== this.props.data;
    }

    render(){
        console.log('render PhoneInfoList');
        // App.js에서 PhoneInfo로 info 와 onRemove의 이름으로 넘겨준 props
        const { data, onRemove ,onUpdate } = this.props;
        const list = data.map(
            // key는 리액트에서 배열을 렌더링을 할 때 꼭 필요한 값.
            info => (<PhoneInfo key = {info.id} info = {info} onRemove = {onRemove} onUpdate ={onUpdate} />)
            // //info => (<PhoneInfo key = {info.id} info={info} />)
            // (info,index) => (<PhoneInfo key = {index} info={info} />)
        )
        return(
            <div>
                {list}
            </div>
        )
    }
}
export default PhoneInfoList;