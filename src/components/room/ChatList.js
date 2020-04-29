import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Responsive from '../common/Button';
import {Link} from 'react-router-dom';

const PostListBlock = styled(Responsive)`
margin-top:3rem;
margin-left:10rem;
`;

//h1이 날짜
const PostItemBlock = styled.div`
border:'1px solid black';
padding-top:1rem;
padding-bottom:1rem;
display:flex;
text-align:center;
justify-content:space-between;

&:first-child{
    padding-top:0;
}
&+&{
    border-top:1px solid gray;
}
h1{ 
    font-weight:200;
    color:green;
    text-align:right;
    font-size:0.8rem;
}
h2{ 
    letter-spacing:2px;
    font-weight:800;
    padding-right:1rem;
    padding-top:1rem;
    color:gray;
    font-size:1rem;
    margin-bottom:1rem;
    margin-top:1rem;
    &:hover{
        color:gray;
    }
}


`;
 // 
const ChatItem = ({post, modal, onChangeField})=>{
    const {id, body, user, publishedDate} = post;
    
    return(
        <PostItemBlock>
            {modal ? <h2> 
            <button onClick = {()=>onChangeField({key:'postId', value:id})}>
                <Link to = {`/chat/@${id}`}>{id}</Link></button> : {body}
                </h2> : 
            <h2>  <button onClick = {()=>onChangeField({key:'postId', value:user.username})}>
                <Link to = {`/chat/@${user.username}`}>{user.username}</Link></button> 
                : {body}</h2> }
            <br/>
            <h1>{new Date(publishedDate).toLocaleDateString()}
            {new Date(publishedDate).toLocaleTimeString()}
            </h1>
        </PostItemBlock>
    );
};

const ChatList = ({user, posts, modal, onChangeField})=>{ //modal true=> 보내는 편지 false=> 받은편지

    return(
        <div>
            <PostListBlock>
        { modal ? <div>{user}이 쓴 쪽지</div>
        : <div>{user}이 받은 편지</div>
            }
        <br/>
        {posts &&  posts.map(post=>(<ChatItem post= {post} modal = {modal} key= {post._id}
        onChangeField = {onChangeField} />))
        }
        </PostListBlock>
        </div>
    );
};

export default ChatList;