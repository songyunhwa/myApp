import React,{useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import watchlist, {watchListPost} from '../../modules/watchlist';
import WatchList from './WatchList';
import {changeField} from '../../modules/chat';
import {removeWatchList} from '../../lib/api/watch';
// myPage => 관심 목록 설정한 페이지 보기

const ChatContainer = ({visible})=>{ // false 일 때 받은 편지
    const dispatch =useDispatch();
    const {posts, postsError} = useSelector(({user, watchlist})=>({
        posts: watchlist.posts,
        postsError: watchlist.postsError,
    }));

    
    useEffect(username=>{
        dispatch(
            watchListPost({username})
        );
    },[dispatch, posts]);


    const removeList= async (id)=> {
        try{
        await removeWatchList({id});
        }catch(e){
            console.log(e);
        }
    };

    return(
        <WatchList
            posts={posts}
            removeList = {removeList}
        />
    );
};

export default withRouter(ChatContainer);