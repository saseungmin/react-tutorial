import React ,{Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component{

    static defaultProps = {
        data : []
    }

    render(){
        const {data} = this.props;
        const list = data.map(
            //  key는 리액트에서 배열을 렌더링을 할 때 꼭 필요한 값.
            //info => (<PhoneInfo key = {info.id} info={info} />)
            (info,index) => (<PhoneInfo key = {index} info={info} />)
        )
        return(
            <div>
                {list}
            </div>
        )
    }
}
export default PhoneInfoList;