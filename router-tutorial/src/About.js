import React from 'react';
import qs from 'qs';

const About = ({location}) => {
    // qs를 사용해 url를 객채 형태로 바꿔준다.
    const query = qs.parse(location.search,{
        ignoreQueryPrefix : true // 문자열 맨 앞을 ?를 생략한다.
    });
    // 객체로 파싱하는 과정은 항상 문자열
    const showDetail = query.detail === 'true';
    return (
        <div>
           <h1>소개</h1>
           <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p> 
           {showDetail && <p>detail 값은 true !</p>}
        </div>
    );
};

export default About;