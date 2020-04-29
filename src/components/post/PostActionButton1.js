import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

//포스트 수정 삭제 

const PostActionButtonsBlock = styled.div`
display:flex;
justify-content:flex-end;
margin-bottom:2rem;
margin-top:-1.5rem;
`;

const ActionButton = styled.button`
padding:0.25rem 0.5rem;
border-radius:4px;
color:gray;
font-weight:bold;
border:none;
outline:none;
font-size:0.875rem;
cursor:pointer;
&:hover{
    background:gray;
    color:skyblue;
}
&+&{
    margin-left:0.25rem;
}


`;

const PostActionButton1 = ({onChangeField, onAddWatchList, post})=>{

    const {_id, title , user, category, } = post;

    const addWatchList= ()=>{
        onAddWatchList(_id, user.username, title, category);
    };
    
    return(
        <>
                    <PostActionButtonsBlock>
                     <ActionButton  
                     onClick ={()=>onChangeField({key:'postId', value:user.username})}>
                     <Link to ={`/chat/@${user}`}>쪽지 보내기</Link>
                     </ActionButton>
                     <ActionButton 
                     onClick = {()=>addWatchList()}>
                     관심 목록에 추가하기
                     </ActionButton>
                 </PostActionButtonsBlock>

        </>
    );
};
export default PostActionButton1;