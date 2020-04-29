import {createAction, handleActions} from 'redux-actions';
import createRequestSaga,{
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import {takeLatest} from 'redux-saga/effects';

const CHANGE_FIELD = 'posts/CHANGE_FILED';

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');
const SET_TAG = 'posts/SET_TAG';
const SET_USERNAME = 'posts/SET_USERNAME';
const SET_TITLE = 'posts/SET_TITLE';

export const changeTag = createAction(SET_TAG, ({key, value})=>({
    key,
    value,
}));
export const changeUsername = createAction(SET_USERNAME, ({key, value})=>({
    key,
    value,
}));
export const changeTitle = createAction(SET_TITLE, ({key, value})=>({
    key,
    value,
}));

export const listPosts = createAction(
    LIST_POSTS,
    ({tag, username, page, category, title})=>({tag, username, page, category, title}),
);

export const changeField = createAction(CHANGE_FIELD, ({key, value})=>({
    key,
    value,
}));

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga(){
    yield takeLatest(LIST_POSTS,listPostsSaga);
}

const initialState= {
    posts:null,
    error:null,
    category:'',
    username:'',
    title:'',
    tag:'',
    lastPage : 1,
};

const posts = handleActions(
    {
        [CHANGE_FIELD]:(state, {payload :{key,value}})=>({
            ...state,
            [key]:value,
        }),
        [SET_USERNAME]:(state, {payload :{key,value}})=>({
            ...state,
            [key]:value,
            title:'',
            tag:'',
        }),
        [SET_TITLE]:(state, {payload :{key,value}})=>({
            ...state,
            [key]:value,
            username:'',
            tag:'',
        }),
        [SET_TAG]:(state, {payload :{key,value}})=>({
            ...state,
            [key]:value,
            username:'',
            title:'',
        }),
        [LIST_POSTS_SUCCESS]:(state, {payload:posts, meta: response})=>({
            ...state,
            posts,
            lastPage : parseInt(response.headers['last-page'], 10), //문자열을 숫자로 변환
        }),
        [LIST_POSTS_FAILURE]:(state, {payload:error})=>({
            ...state,
            error,
        }),
    },
    initialState,
);

export default posts;