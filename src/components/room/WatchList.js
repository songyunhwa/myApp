import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Responsive from '../common/Button';
import {Link} from 'react-router-dom';

const PostListBlock = styled(Responsive)`
margin-top:3rem;
margin-left:10rem;
`;


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
const WatchItem = ({post, removeList})=>{
    const {_id, id, username, title, category} = post;
    
    return(
        <PostItemBlock>
           <h2>
            카테고리: {category}
            <br/>  
             제목 : <Link to = {`/@${username}/${id}`}>{title}</Link> 
             <br/>
             글쓴이 : {username}
             </h2>
             <h1>
             <button onClick = {()=>removeList(_id)}>삭제</button>
             </h1>
        </PostItemBlock>
    );
};

const WatchList = ({posts, username, removeList})=>{
    
    return(
        <div>
            <PostListBlock>
        {posts &&  posts.map(post=>(<WatchItem post= {post} key= {post._id}
        removeList = {removeList}/>))
        }
        </PostListBlock>
        </div>
    );
};

export default WatchList;