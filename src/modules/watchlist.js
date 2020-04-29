import {createAction, handleActions} from 'redux-actions';
import createRequestSaga,{
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as watchAPI from '../lib/api/watch';
import {takeLatest} from 'redux-saga/effects';

const [LIST_WATCH_POST , 
    LIST_WATCH_SUCCESS, LIST_WATCH_FAILURE,] = createRequestActionTypes('watchlist/LIST_WATCH_POST');
const [WRITE_WATCH_POST , 
        WRITE_WATCH_SUCCESS, WRITE_WATCH_FAILURE,] = createRequestActionTypes('watchlist/WATCH_LIST_POST');
    
export const watchListPost = createAction(LIST_WATCH_POST, ({username, title})=>({username,title}),);
export const writeWatchList = createAction(
    WRITE_WATCH_POST,
    ({id, username, title , category})=>({id,username, title, category}),
);

const watchListPostSaga = createRequestSaga(LIST_WATCH_POST, watchAPI.listWatchList);
const writewatchListPostSaga = createRequestSaga(WRITE_WATCH_POST, watchAPI.writeWatchList);
export function* watchSaga(){
    yield takeLatest(LIST_WATCH_POST, watchListPostSaga);
    yield takeLatest(WRITE_WATCH_POST, writewatchListPostSaga);
}


const initialState= {
    post:null,
    postError:null,
    posts:null,
    postsError:null,
};

const watchlist = handleActions(
    {
        [WRITE_WATCH_SUCCESS]:(state, {payload:post})=>({
            ...state,
            post,
        }),
        [WRITE_WATCH_FAILURE]:(state, {payload:postError})=>({
            ...state,
            postError,
        }),
        [LIST_WATCH_SUCCESS]:(state, {payload:posts})=>({
            ...state,
            posts,
        }),
        [LIST_WATCH_FAILURE]:(state, {payload:postsError})=>({
            ...state,
            postsError,
        }),
    },
    initialState,
);

export default watchlist;