import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
    const activeStyle = {
        background : 'black',
        color : 'white',
    };
    return (
        <div>
            <h3> 사용자 목록 : </h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/seungmin">seungmin</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to= "/profiles/harang">harang</NavLink>
                </li>
            </ul>
            {/*render는 보여주고 싶은 JSX를 넣어 줄 수 있다.
               JSX에서 props를 설정할 때 값을 생략하면 자동으로 true로 설정된다.
            */}
            <Route path="/profiles" exact render={() => <div>사용자를 선택해 주세요.</div>}/>
            <Route path="/profiles/:username" component={Profile} />
            
        </div>
    );
};

export default Profiles;