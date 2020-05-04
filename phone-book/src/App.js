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
    ],
    keyword : ''
  }

  handleChange = (e) => {
    this.setState({
      keyword : e.target.value
    });
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

  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      // 받은 id 값을 빼고 filter
      information : information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => id === info.id ? {...info,...data} : info // 새 객체를 만들어서 기존의 값과 전달받는 data를 덮어씀
      )
    })

  }
  render(){
    const {information ,keyword} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    )
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <p>
          <input placeholder="검색 할 이름을 입력하세요." onChange={this.handleChange} value={keyword}/>
        </p>
        <hr/>
        <PhoneInfoList data={filteredList} onRemove = {this.handleRemove} onUpdate = {this.handleUpdate}/>
      </div>
    );
    
  }
}

export default App;
