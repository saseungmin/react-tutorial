import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing : border-box;
    padding-bottom : 3rem;
    width : 768px;
    margin : 0 auto;
    margin-top : 2rem;
    @media screen and (max-width: 768px) {
        width : 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({category}) => {
    // 커스텀 Hooks 사용 전
    //const [articles, setArticles] = useState(null);
    //const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     // async를 사용하는 함수 따로 선언
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try{
    //             const query = category === 'all' ? '' : `&category=${category}`;
    //             const response = await axios.get(
    //                 `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=13aa2124041b46969720f94915ea8c08`
    //                 );
    //             setArticles(response.data.articles); 
    //         }catch(e){
    //             console.log(e);
    //         }
    //         setLoading(false);
        
    //     };
    //     fetchData();
    // },[category])

    // 커스텀 Hooks 만든 후, usePromise()
    const [loading,response,error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=13aa2124041b46969720f94915ea8c08`
        );
    },[category])


    // 대기 중
    if(loading){
        return <NewsListBlock>대기중...</NewsListBlock>
    }
    // 아직 articles 값이 설정되지 않았을때
    // if(!articles){
    //     return null;
    // }

    // 커스텀 Hooks 만든 후, usePromise()
    if(!response){
        return null;
    }
    if(error){
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }
    // response 값이 있을 때
    const {articles} = response.data;
    // articles 값이 있을 때
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={articles.url} article={article}/>
            ))}
        </NewsListBlock>
    );
};

export default NewsList;