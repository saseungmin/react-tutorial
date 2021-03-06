import React from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import {getUsers} from '../modules/users';
import {Preloader} from '../lib/PreloadContext';

const {useEffect} = React;

const UsersContainer = ({users,getUsers}) => {
    // 컴포넌트가 마운트되고 나서 호출
    useEffect(()=>{
        if(users) return; // 있으면 요청하지 않는다.
        getUsers();
    },[getUsers,users]);
    return (
        <>
            <Users users={users}/>
            {/*resolve 함수를 props로 받아 오며, 컴포넌트가 렌더링될 떄 서버 환경에서만 resolve 함수를 호출해 준다. */}
            <Preloader resolve={getUsers}/>
        </>
    );
};


// 리덕스 연동
// 첫번째 인자 : 리덕스 스토어 안의 상태
// 두번째 인자 : 액션 생성 함수
export default connect(
    state => ({
        users: state.users.users
    }),
    {
        getUsers
    }
)(UsersContainer);