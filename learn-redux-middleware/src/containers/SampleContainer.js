import React from 'react';
import {connect} from 'react-redux';
import Sample from '../components/Sample';
import {getPost,getUsers} from '../modules/sample';

const {useEffect} = React;
const SampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers
}) => {
    // 클래스 형태 컴포넌트였다면 componentDidMount
    useEffect(() => {
        // useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
        // 그 내부에서 async 함수를 선언하고 호출해 준다.
        // 로딩중에 대한 상태를 관리할 필요가 없다.
        const fn = async () => {
            try {
                await getPost(1);
                await getUsers(1);
            } catch (e) {
                console.log(e);
            }
        };
        fn();
    },[getPost,getUsers]); // getUsers, getPost 값이 업데이트 될 때만 리랜더링
    return (
        <Sample post={post} users={users} loadingPost={loadingPost} loadingUsers={loadingUsers} />
    );
};

export default connect(({sample,loading}) => ({
    post : sample.post,
    users : sample.users,
    // loadingPost : sample.loading.GET_POST,
    // loadingUsers : sample.loading.GET_USERS
    // 리팩토링
    loadingPost : loading['sample/GET_POST'],  // true or false 값
    loadingUsers : loading['sample/GET_USERS']  // true or false 값
}),
{
    getPost,
    getUsers
}
)(SampleContainer);