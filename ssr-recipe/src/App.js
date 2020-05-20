import React from 'react';
import './App.css';
import Menu from './components/Menu';
import { Route } from 'react-router-dom';
// 라우트 컴포넌트 스플리팅하기
import loadable from '@loadable/component';
const RedPage = loadable(() => import('./pages/RedPage'));
const BluePage = loadable(() => import('./pages/BluePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));

// import RedPage from './pages/RedPage';
// import BluePage from './pages/BluePage';
// import UsersPage from './pages/UsersPage';


function App() {
  return (
    <div>
      <Menu/>
      <hr/>
      <Route path="/red" component={RedPage}/>
      <Route path="/blue" component={BluePage}/>
      <Route path="/users" component={UsersPage}/>
    </div>
  );
}

export default App;
