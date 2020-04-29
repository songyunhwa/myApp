import React,{useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {writeChat} from '../../modules/chat';
import Chat from './Chat';

//쪽지 보내는 창
const ChatContainer = ({history})=>{
    const dispatch =useDispatch();
    const {user, post, postError, id} = useSelector(({user, chat})=>({
        user: user.user,
        post: chat.post,
        postError: chat.postError,
        id: chat.postId,
    }));


    const onPublish =(body)=>{
        console.log(body);
        dispatch(
            writeChat({id,  body}),
        );
    };

    const onBack = useCallback(()=>{
       // const {_id} = post;
        history.go(-1);
    }, [history,]);
    
    return(
        <Chat
        onPublish = {onPublish}
        user = {user} //받는 사람
        postId = {id} //보내는 사람
        onCancel ={onBack}
        />
    );
};

export default withRouter(ChatContainer);