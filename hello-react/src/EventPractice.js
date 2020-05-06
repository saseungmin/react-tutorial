import React, { useState } from 'react';

//함수형 컴포넌트
const EventPractice = () => {
	//e.target.name 활용 안하고 사용
	//const [username, setUsername] = useState('');
	//const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		username: '',
		message: '',
	});
	//const onChangeUsername = (e) => setUsername(e.target.value);
	//const onChangeMessage = (e) => setMessage(e.target.value);
	const { username, message } = form;
	const onChange = (e) => {
		const nextForm = {
			...form, //기존의 form 내용을 이자리에 복사한 뒤
			[e.target.name]: e.target.value, // 원하는 값을 덮어 씌우기
		};
		setForm(nextForm);
	};
	const onClick = () => {
		alert(username + ':' + message);
		// setUsername('');
		// setMessage('');
		setForm({
			username: '',
			message: '',
		});
	};
	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			onClick();
		}
	};

	return (
		<div>
			<h1> 이벤트 연습 </h1>
			<input
				type="text"
				name="username"
				placeholder="사용자명"
				value={username}
				//onChange={onChangeUsername}
				onChange={onChange}
			></input>
			<input
				type="text"
				name="message"
				placeholder="메시지"
				value={message}
				//onChange={onChangeMessage}
				onChange={onChange}
				onKeyPress={onKeyPress}
			></input>
			<button onClick={onClick}>확인</button>
		</div>
	);
};

export default EventPractice;
