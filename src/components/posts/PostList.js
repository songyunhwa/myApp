import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Button';
import Tags from '../common/Tags';
import {Link} from 'react-router-dom';

const PostListBlock = styled(Responsive)`
margin-left:10rem;
`;


const PostItemBlock = styled.div`
padding-top:1rem;
padding-bottom:1rem;
display:flex;
flex-direction:row;
&:first-child{
    padding-top:0;
}
&+&{
    border-top:1px solid gray;
}
.right{
    text-align: right;
    padding-left:3rem;
}
h2{
    color:black;
    font-size:1.5rem;
    margin-bottom:0;
    margin-top:0;
    &:hover{
        color:gray;
    }
}
h1{
    color:gray;
    font-size:1rem;
    margin-bottom:0;
    margin-top:0;
}
p{
    margin-top:1rem;
}
.imageStyle{
    margin-left:1rem;
    width:auto;
    height:auto;
    max-width:200px;
    max-height:300px;
}
`;


const PostItem = ({post})=>{
    const {publishedDate, user, tags, title, body, _id, price, imagepath} = post;
    const path ="http://localhost:5000/public/images/" +`${imagepath}`;
    return(
        <PostItemBlock>
             {imagepath !== '' ? <img class= 'imageStyle' src={path} />:{}}
            <div class = 'right'>
            <h2><Link to ={`/@${user}/${_id}`}>{title}</Link></h2>
            <p>{body}</p>
            <h1>{price}원</h1>
            <Tags tags={tags}/>
            </div>
        </PostItemBlock>
    );
};

const PostList = ({posts,loading, error, showWriteButton})=>{

    if(error){
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }

    return(
        <PostListBlock>
      <div>
      { !loading && posts &&
          posts.map(post=>(<PostItem post= {post} key= {post._id}/>))
      }
      </div>
  </PostListBlock>
    );
};

export default PostList;