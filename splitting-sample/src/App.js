import React,{useState, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';
// loadable component 통한 코드 스플리팅 : 장점은 서버 사이드 렌더링을 지원하고 렌더링하기 전에 필요할 때 스플리팅된 파일을 
// 미리 불러올 수 있는 기능도 있다.
const SplitMe = loadable(() => import('./SplitMe'),{
  fallback : <div>loading...</div>
});

//React.lazy와 Suspense를 사용
//컴포넌트를 랜더링하는 시점에서 비동기적으로 로딩할 수 있게 해주는 유틸 함수.
//const SplitMe = React.lazy(() => import('./SplitMe'));

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  }
  // loadable component에서 컴포넌트를 미리 불러오는 방법
  const onMouseOver = () => {
    SplitMe.preload();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>hello react!</p>
        {/*코드 스플링된 컴포넌트를 로딩핟도록 발동시킬수 있고, 로딩이 끝나지 않았을 떄 보여줄 UI를 설정할 수 있다. */}
        {/* <Suspense fallback={<div>loading...</div>}>*/}
          {visible && <SplitMe/>}
        {/*</Suspense> */}
      </header>
    </div>
  );
};

export default App;

//import notify from './notify';

// function App() {
//   // const onClick = () => {
//   //   notify();
//   // }
//   const onClick = () => {
//     // build 할 때 main안에 안들어가고 파일을 분리시켜서 따로 저장된다.
//     // 실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있다.
//     // Promise를 반환
//     // build/static/js/3으로 시작하는 파일에 notify가 따로 들어간다.
//     import('./notify').then(result => result.default());
//   }
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p onClick={onClick}>
//           hello react!
//         </p>
//       </header>
//     </div>
//   );
// }


// state를 사용한 코드 스플리팅
// class App extends Component {
//   state = {
//     SplitMe : null
//   };
//   handleClick = async () => {
//     const loadedModule = await import('./SplitMe');
//     this.setState({
//       SplitMe : loadedModule.default
//     })
//   }
//   render() {
//     const {SplitMe} = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p onClick={this.handleClick}>
//             hello react!
//           </p>
//           {SplitMe && <SplitMe/>}
//         </header>
//       </div>
//     );
//   }
// }