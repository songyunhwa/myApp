import {createAction, handleActions} from 'redux-actions';
import createRequestSaga,{
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as chatsAPI from '../lib/api/chat';
import {takeLatest} from 'redux-saga/effects';
const CHANGE_FIELD = 'chat/CHANGE_FILED';
const [
    LIST_CHATS,
    LIST_CHATS_SUCCESS,
    LIST_CHATS_FAILURE,
] = createRequestActionTypes('chat/LIST_CHATS');
const [
    WRITE_CHAT,
    WRITE_CHAT_SUCCESS,
    WRITE_CHAT_FAILURE,
] = createRequestActionTypes('chat/WRITE_CHAT');
export const changeField = createAction(CHANGE_FIELD, ({key, value})=>({
    key,
    value,
}));
export const listChat = createAction(
    LIST_CHATS,
    ({id, username})=>({id, username}),
);
export const writeChat = createAction(
    WRITE_CHAT,
    ({id, body})=>({id,  body}),
);

const listChatSaga = createRequestSaga(LIST_CHATS, chatsAPI.listChat);
const writeChatSaga = createRequestSaga(WRITE_CHAT, chatsAPI.writeChat);
export function* chatSaga(){
    yield takeLatest(LIST_CHATS,listChatSaga );
    yield takeLatest(WRITE_CHAT,writeChatSaga);
}

const initialState= {
    postId:'', // post를 쓴 작성자.
    post:null,
    postError:null,
    posts:null,
    postsError:null,
};

const chat = handleActions(
    {
        [CHANGE_FIELD]:(state, {payload :{key,value}})=>({
            ...state,
            [key]:value,
        }),
        [WRITE_CHAT]:state=>({
            ...state,
            post:null,
            postError:null,
        }),
        [WRITE_CHAT_SUCCESS]:(state, {payload:post})=>({
            ...state,
            post,
        }),
        [WRITE_CHAT_FAILURE]:(state, {payload:postError})=>({
            ...state,
            postError,
        }),
        [LIST_CHATS_SUCCESS]:(state, {payload:posts})=>({
            ...state,
            posts,
        }),
        [LIST_CHATS_FAILURE]:(state, {payload:postsError})=>({
            ...state,
            postsError,
        }),
    },
    initialState,
);

export default chat;