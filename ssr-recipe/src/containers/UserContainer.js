import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../modules/users';
import { Preloader, usePreloader } from '../lib/PreloadContext';
import User from '../components/User';

const UserContainer = ({id}) => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    usePreloader(() => dispatch(getUser(id))); // 서버 사이드 렌더링을 할 때 API 호출하기
    useEffect(() => {
        if(user && user.id === parseInt(id, 10)) return; //사용자가 있고, id가 같으면 요청하지 않음
        dispatch(getUser(id));
    },[dispatch, id, user]); // 아이디가 바뀔 떄 새로 요청


    // 서버 사이드 렌더링을 해야되기 때문에 컨테이너 유효성 검사 후 return null 일때 null 대신 Preloader 반환
    // 데이터가 없는 경우 GET_USER 액션을 발생한다.
    // Preloader 컴포넌트 사용해서 API 호출
    // if(!user){
    //     return <Preloader resolve={() => dispatch(getUser(id))}/>
    // }

    // Hooks를 사용해서 서버 사이드 렌더링 API 요청하기
    if (!user) return null;
    return <User user={user} />
};

export default UserContainer;