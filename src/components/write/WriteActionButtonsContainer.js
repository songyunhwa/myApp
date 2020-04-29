import React, {useEffect} from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {writePost, updatePost,changeField} from '../../modules/write';


const WriteActionButtonsContainer = ({history})=>{
    const dispatch = useDispatch();
    const {title, body, price, tags, category, imagepath, post ,postError, originalPostId} = useSelector(({write})=>({
        title:write.title,
        body:write.body,
        price:write.price,
        tags:write.tags,
        category:write.category,
        imagepath:write.imagepath,
        post:write.post,
        postError:write.postError,
        originalPostId:write.originalPostId,
    }));

    const onChangePath = path =>{
        dispatch(
            changeField({
                key:'imagepath',
                value :path,
            }),
        );
        onPublish();
    };


    const onCancel = ()=>{
        history.goBack();
    };

    const onPublish =()=>{
        if(originalPostId){
            dispatch(updatePost({title,body,price, tags, category, imagepath, id:originalPostId}));
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                price,
                tags,
                category,
                imagepath,
            }),
        )
    };

    useEffect(()=>{
        if(post){
            const {_id, user} = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if(postError){
            console.log(postError);
        }
        
    },[history, post, postError]);

    return(
    <WriteActionButtons onPublish={onPublish} onCancel={onCancel}
    onChangePath  = {onChangePath} 
    imagepath = {imagepath} 
    isEdit= {!!originalPostId}/>
    );
};

export default withRouter(WriteActionButtonsContainer);