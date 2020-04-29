import React, {useState, useCallback} from 'react';
import styled from 'styled-components';

const PostActionButtonsBlock = styled.div`
margin-bottom:2rem;
margin-top:2rem;
`;

const ActionDiv = styled.div`
padding:0.25rem 0.5rem;
border-radius:4px;
color:gray;
font-weight:bold;
border:none;
outline:none;
font-size:0.875rem;
margin-left:2rem;
margin-bottom:1rem;
`;

const ActionInput = styled.input`
height:100px;
width:200px;
font-size:0.875rem;
border-radius:4px;
margin-left:2rem;
margin-bottom:1rem;
outline:'1px solid green';
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
margin-left:2rem;
&:hover{
    background:gray;
    color:skyblue;
}

`;

const Chat = ({onPublish, user, postId, onCancel})=>{
    const writer = postId;
    const [input, setInput] = useState('');
    
    const onSubmit = e=>{
        onPublish(input);
    };

    const onChange = useCallback(e =>{
        setInput(e.target.value);
    },[]);
   
    const onBack = useCallback(e =>{
        onCancel();
    },[]);
   // 
    return(
        <PostActionButtonsBlock>
                <ActionDiv>받는 사람: {writer}</ActionDiv>
                <ActionDiv>보내는 사람: {user.username}</ActionDiv>
                <ActionInput placeholder="내용을 입력하세요."
                onChange = {onChange} value={input}/>
                <br/>
            <ActionButton onClick = {onSubmit}>보내기</ActionButton>
            <ActionButton onClick = {onBack}>뒤로 가기</ActionButton>
            </PostActionButtonsBlock>
    );
};

export default Chat;
