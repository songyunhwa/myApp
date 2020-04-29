import React, {useCallback} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {changeTag, changeUsername, changeTitle} from '../../modules/posts';
import SearchForm from './SearchForm';

//검색 기능과 글쓰기 버튼이 있음

const SearchFormContainer = ()=>{
    const dispatch = useDispatch();
    const {category, user} = useSelector(
        ({posts, user})=>({
                user : user.user,
                category:posts.category,
        }),
    );

    const onChangeField = (input, search) =>{
        if(search === 'username'){
            dispatch(
                changeUsername({
                    key:'username',
                    value :input,
                }),
                );
        }
       else if(search === 'tag'){
        dispatch(
            changeTag({
                key:'tag',
                value :input,
            }),
        );
        }
        else if(search === 'title'){
            dispatch(
                changeTitle({
                    key:'title',
                    value :input,
                }),
            );
        }
    };

    return(
        <SearchForm
        onChangeField = {onChangeField}
        category = {category}
        showWriteButton={user}
        />
    );
};

export default withRouter(SearchFormContainer);