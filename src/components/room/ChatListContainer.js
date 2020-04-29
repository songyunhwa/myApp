import React,{useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {listChat, writeChat} from '../../modules/chat';
import ChatList from './ChatList';
import {changeField} from '../../modules/chat';
import { removeChat } from '../../lib/api/chat';

//myPage -> 받은 편지 보는 편지 볼 수 있음.
const ChatContainer = ({modal})=>{ // false 일 때 받은 편지
    const dispatch =useDispatch();
    const {id,  posts, postsError} = useSelector(({user, chat})=>({
        id: user.user.username,
        posts: chat.posts,
        postsError: chat.postsError,
    }));

    
    useEffect(()=>{
        //id가 받은 편지함. username은 보낸 편지함에서 씀.
        if(modal){
            const username = id;
            dispatch(
            listChat({username}),
            );
        }
        else{
        dispatch(
            listChat({id}),
        );
        }
        
    },[dispatch, modal]);

    const onChangeField = useCallback(payload=>{
        console.log(payload);
        dispatch(changeField(payload))
    },
        [dispatch,]);
/*
        const onDelete = useCallback((id, username)=>{
            dispatch(removeChat(id, username)); //username 보낸 사람 id 가 받은사람
        }, [dispatch]);
*/
    return(
        <ChatList
            posts={posts}
            user={id}
            modal={modal}
            onChangeField= {onChangeField}
        />
    );
};

export default withRouter(ChatContainer);