import React , {useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {readPost, unloadPost} from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButton';
import write, {setOriginalPost} from '../../modules/write';
import {removePost} from '../../lib/api/posts';
import {changeField} from '../../modules/chat';
import {writeWatchList} from '../../modules/watchlist';
import PostActionButton1 from './PostActionButton1';
//id,username,title,category
const PostViewerContainer = ({match, history})=>{
    const {postId} = match.params;
    const dispatch = useDispatch();
    const {post,error,loading, user} = useSelector(({post, loading, user})=>({
        post: post.post,
        error:post.error,
        loading:loading['post/READ_POST'],
        user: user.user,
    }));

    useEffect(()=>{
        dispatch(readPost(postId));

        return ()=>{
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const onEdit = useCallback(()=>{
        dispatch(setOriginalPost(post));
        history.push('/write');
    }, [dispatch, post]
    );

    const onRemove= async ()=> {
        try{
            console.log(postId);
        await removePost(postId);
        history.push('/');
        }catch(e){
            console.log(e);
        }
    };
    //쪽지 보내기
    const onChangeField = useCallback(payload=>{
        dispatch(changeField(payload));
    },
        [dispatch,]);
    //관심 목록 추가하기
    const onAddWatchList = useCallback((id, username, title, category)=>{
        
        dispatch(writeWatchList({id, username, title, category}));
    },[dispatch]); 
 
    const ownPost =(user && user._id) === (post && post.user._id);
    const noLogin = (user === null); 
    
    return<PostViewer post= {post} error={error} loading={loading} 
    actionButton1 = {!noLogin && <PostActionButton1 onChangeField = {onChangeField}
    onAddWatchList = {onAddWatchList} post ={post} />}
    actionButtons = {ownPost && <PostActionButtons onEdit = {onEdit} onRemove={onRemove}/>}/>;
};

export default withRouter(PostViewerContainer);