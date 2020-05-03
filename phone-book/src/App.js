import React, {Component} from 'react';
import PhoneForm from './components/PhoneFrom';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 2
  state ={
    information:[
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ]
  }

  handleCreate = (data) => {
    // data : {name: "사승민", phone: "01099066359"} submit 한 후 넘어오는 값
    // information : 현재 가지고 있는 값
    const {information} = this.state;
    // setState : 현재 가지고 있는 값에 data 값을 concat 해서 새 배열 만듬.
    this.setState({
      information: information.concat({id: this.id++,...data})
    })
  }
  render(){
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <PhoneInfoList data = {this.state.information}/>
      </div>
    );
    
  }
}

export default App;
