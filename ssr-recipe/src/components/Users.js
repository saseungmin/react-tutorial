import React from 'react';
import {Link} from 'react-router-dom';

const Users = ({users}) => {
    if (!users) return null; // null 이면  아무것도 안보여줌
    return (
        <div>
            <ul>
                {/*대괄호로 ~!!!! 제발*/}
                {users.map(user => (
                    <li key={user.id}>
                        <Link to ={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;