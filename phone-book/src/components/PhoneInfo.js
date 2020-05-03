import React ,{Component} from 'react';

class PhoneInfo extends Component{

    // 기본값 설정
    static defaultProps ={
        info:{
            name: '이름',
            phone: '010-9922-1123',
            id: 0
        }
    }

    render(){
        const style ={
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const {
            name, phone, id
        } = this.props.info;
        return(
            <div style ={style}>
                <div><b>{id}.{name}</b></div>
                <div>{phone}</div>
            </div>
        )
    }
}

export default PhoneInfo;