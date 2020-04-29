import React from 'react';
import Category from './Category';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import qs from 'qs';
import {changeField} from '../../modules/posts';

const CategoryContainer = ({location, match})=>{
    const dispatch =useDispatch();
    const {posts,loading, category} = useSelector(({posts, loading})=>({
        posts: posts.posts,
        category: posts.category,
        loading: loading['posts/LIST_POSTS'],
    }));

    //포스트 데이터가 없거나 로딩 중이면 아무 것도 보여주지 않음
    if(!posts || loading) return null;

    const {username} = match.params;

    //page 가 없으면 1을 기본값으로 사용
    const {tag , page=1} = qs.parse(location.search,{
        ignoreQueryPrefix : true,
    });
    
    const onChangeField = cate =>{
        dispatch(
            changeField({
                key:'category',
                value :cate,
            }),
        );
    };

    return(
        <Category
        tag={tag}
        username={username}
        page={parseInt(page, 10)}
        onChangeField = {onChangeField}
        category = {category}
        />
    );
};

export default withRouter(CategoryContainer);