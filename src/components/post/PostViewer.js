import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';

const PostViewerBlock = styled(Responsive)`
margin-top:4rem;`;

const PostHead =styled.div`
border-bottom:1px solid gray;
padding-bottom:3rem;
margin-bottom:3rem;
display:flex;
flex-direction:row;

h1{
    font-size:3rem;
    line-height:1.5;
}
.right{
    text-align: right;
    margin-left:5rem;
}
.imageStyle{
    margin-left:10rem;
    width:auto;
    height:auto;
    max-width:300px;
    max-height:400px;
}

`;
const PostContent = styled.div`
font-size:1.3125rem;
color: gray;
margin-bottom:10rem;
`;

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


const PostViewer = ({ post, error, loading, actionButton1, actionButtons})=>{
    if(error){
        if(error.response && error.response.stats === 404){
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
        }
        return <PostViewerBlock>오류 발생</PostViewerBlock>;
    }

    if(loading || !post){
        return null;
    }

    const {_id, title , body, user, publishedDate, tags, price, category, imagepath} = post;

    

    const path ="http://localhost:5000/public/images/" +`${imagepath}`;
    return(
        <PostViewerBlock>
               <Helmet>
                <title>{title} - myOLD</title>
                </Helmet>
                {actionButtons} 
                {actionButton1} 
            <PostHead>
                {imagepath !== '' ? <img class= 'imageStyle' src={path} />:{}}
                <div class = 'right'>
                <h1>{title}</h1>
                {price}원
                <SubInfo
                    username = {user.username}
                    publishedDate = {publishedDate}
                    hasMarginTop/>
                <Tags
                 tags = {tags}/>
                 </div>
            </PostHead>
            <actionButtons/>
            <PostContent dangerouslySetInnerHTML={{__html:body}}>
            </PostContent>
        </PostViewerBlock>
    );
};

export default PostViewer;