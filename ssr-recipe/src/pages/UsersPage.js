import React from 'react';
import UsersContainer from '../containers/UsersContainer';
import { Route } from 'react-router-dom';
import UserContainer from '../containers/UserContainer';

const UsersPage = () => {
    return (
        <>
            <UsersContainer/>
            {/*render를 사용해서 UserContainer를 렌더링할 때 URL 파라미터 id를 props로 바로 넣어줄 수 있다. */}
            <Route path="/users/:id" render={({match}) => <UserContainer id={match.params.id} />} />
        </>
    );
};

export default UsersPage;