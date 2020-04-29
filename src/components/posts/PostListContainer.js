import React, {useEffect} from 'react';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PostList from '../../components/posts/PostList';
import {listPosts} from '../../modules/posts';

const PostListContainer = ({location, match})=>{
    const dispatch = useDispatch();
    const {posts, error, loading,  category, username, title, tag} = useSelector(
        ({posts, loading ,user})=>({
                posts:posts.posts,
                error: posts.error,
                loading : loading['posts/LIST_POSTS'],
                category:posts.category,
                username : posts.username,
                title: posts.title,
                tag: posts.tag,
        }),
    );
    useEffect(()=>{
       // const {username} = match.params;
        const {page} = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });

        dispatch(listPosts({title, tag, username, page, category}));
    }, [dispatch, location.search , category, username, title, tag]);

    return(
        <PostList
        loading={loading}
        error={error}
        posts={posts}
        />
    );
};

export default withRouter(PostListContainer);