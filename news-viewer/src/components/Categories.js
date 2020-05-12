import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
    {
        name :'all',
        text : '전체보기'
    },
    {
        name :'business',
        text : '비지니스'
    },
    {
        name :'sports',
        text : '스포츠'
    },
    {
        name :'entertainment',
        text : '엔터테인먼트'
    },
    {
        name :'health',
        text : '건강'
    },
    {
        name :'science',
        text : '과학'
    },
    {
        name :'technology',
        text : '기술'
    }
];

const CategoriesBlock = styled.div`
    display :flex;
    padding : 1rem;
    width :768px;
    margin : 0 auto;
    @media screen and (max-width : 768px){
        width : 100%;
        overflow-x :auto;
    }
`;

//const Category = styled.div`
const Category = styled(NavLink)`
    font-size : 1.250rem;
    cursor: pointer;
    white-space: pre;
    text-decoration : none;
    color : inherit;
    padding-bottom: 0.25rem;

    &:hover{
        color : darkgray;
    }

    /* Category active가 true 일 때 */ 
    /* 아래 방법은 리액트 라우터 적용 전(NavLink 적용전)
    ${props =>
        props.active && css `
            font-weight: 600;
            border-bottom : 2px solid #22b8cf;
            color : #22b8cf;
            &:hover{
                color : #3bc9db;
            }
        `
    } */

    /* NavLink 적용 후 */
    &.active {
        font-weight: 600;
        border-bottom : 2px solid #22b8cf;
        color : #22b8cf;
        &:hover{
            color : #3bc9db;
        }
    }


    &+& {
        margin-left : 1rem;
    }

`;

//NavLink 적용 전 : const Categories = ({onSelect,category}) => {
const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map(c => (
                /*NavLink 적용 전 : <Category key={c.name} active={category === c.name} onClick={() => onSelect(c.name)}><b>{c.text}</b></Category>*/
                <Category key={c.name} activeClassName="active" exact={c.name === 'all'} to={c.name === 'all' ? '/' :`${c.name}`}><b>{c.text}</b></Category>
            ))}
        </CategoriesBlock>

    );
};

export default Categories;