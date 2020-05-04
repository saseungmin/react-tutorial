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

    state ={
        // 수정 버튼 눌렀을 떄 editing 값을 true로 설정
        // 이 값이 true 일 때는, 기존 텍스트 형태로 보여주던 값을
        // input 형태로 보여주게 된다.
        editing : false,
        // input 값을 담기 위해서 각 필드를 위한 값도 설정
        name : '',
        phone : ''
    }

    handleRemove = () => {
        const {info, onRemove} = this.props;
        // onRemove을 통해서 info.id 값을 부모에게 전달
        onRemove(info.id);
    }

    // editing 값을 반전시키는 함수
    handleToggleEdit = () => {
        const {editing} = this.state;
        this.setState({ editing : !editing });
    }

    // input 에서 onChange 이벤트가 발생 될 때 호출
    handleChange = (e) => {
        console.log(e.target);
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }

    componentDidUpdate(prevProps, prevState){
        // editing 값이 변경될때 처리
        // 수정 눌렀을땐 기존의 값이 input에 나타남
        // 수정을 적용할땐 input의 값들을 부모헨테 전달
        console.log("prevState",prevState,"prevProps",prevProps);
        console.log("editing",this.state.editing);
        const {info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing){
            // editing 값이 false -> true 로 전환 될 때
            // info의 값을 state에 넣어준다.
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }
        if(prevState.editing && !this.state.editing){
            // editing 값이 true -> false로 전환 될 떄
            onUpdate(info.id,{
                name: this.state.name,
                phone: this.state.phone
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info){
            return false;
        }
        // 나머지 경우 리렌더링함
        return true;
    }

    render(){
        console.log('render PhoneInfo' + this.props.info.id);
        const style ={
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const {editing} = this.state;

        if(editing){ // 수정
            return(
                <div style={style}>
                    <div>
                        <input value={this.state.name} name="name" placeholder="이름" onChange={this.handleChange} />
                    </div>
                    <div>
                        <input value={this.state.phone} name="phone" placeholder="전화번호" onChange={this.handleChange} />
                    </div>
                    <button onClick={this.handleToggleEdit}>적 용</button>
                    <button onClick={this.handleRemove}>삭 제</button>
                </div>
            );
        }

        // 일반
        const {
            name, phone, id
        } = this.props.info;
        return(
            <div style ={style}>
                <div><b>{id}.{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleRemove}>삭 제</button>
                <button onClick={this.handleToggleEdit}>수 정</button>
            </div>
        )
    }
}

export default PhoneInfo;