import React, {useState, useCallback} from 'react';
import Responsive from '../common/Button';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from '../common/Button';

const WritePostButtonWrapper = styled.div`
text-color:black;
align-item: right;
`;

const PostListBlock = styled(Responsive)`
margin-left:10rem;
`;


const SearchForm = ({onChangeField, showWriteButton})=>{
    const [input, setInput] = useState('yun');
    const [search, setSearch] = useState('username');

    const onChangeInput = useCallback(e=>{
        setInput(e.target.value);
    },[]);
    
    const onSubmitInput = e=>{
        onChangeField(input , search);
    };

    const onChangeCategory =useCallback(e=>{
        setSearch(e.target.value);
    }, []);


    return(
        <PostListBlock>
        <WritePostButtonWrapper>
        {showWriteButton &&   
        <Link to="/write">글 등록하기</Link>}
        </WritePostButtonWrapper>
            <select
                placeholder="카테고리"
                value={search}
                onChange={onChangeCategory}>
                        <option value="username">작성자</option>
                        <option value="title">제목</option>
                        <option value="tag">태그</option>
                </select>
          <input 
          onChange = {onChangeInput} value={input}/>
          <Button onClick = {onSubmitInput}>검색</Button>
        </PostListBlock>
    );
};

export default SearchForm;