import React , {useEffect, useCallback} from 'react';
import Editor from '../../components/write/Editor';
import {useSelector, useDispatch} from 'react-redux';
import {changeField, initialize} from '../../modules/write';

const EditorContainer = ()=>{
    const dispatch = useDispatch();
    const {title, body, price, category } =useSelector(({write})=>({
        title:write.title,
        body:write.body,
        price:write.price,
        category:write.category,
    }));

    const onChangeField = useCallback(payload=>dispatch(changeField(payload)),[
        dispatch,
    ]);

    useEffect(()=>{
        return()=>{
            dispatch(initialize());
        };
    }, [dispatch]);

    return <Editor onChangeField={onChangeField} title={title} body={body}
    price={price} catetory={category}/>
};

export default EditorContainer;