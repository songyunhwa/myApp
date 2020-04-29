import client from './client';
import qs from 'qs';

export const writeWatchList = ({id,username, title, category})=>
client.post(`/api/watchlist`, {id,username, title, category});

export const listWatchList = ({username, title})=>{
     const queryString = qs.stringify({
          username,
          title,
      }); 
     return client.get(`/api/watchlist?${queryString}`);
};

//현재 사용 안함.
export const removeWatchList = ({id})=>client.delete(`/api/watchlist/${id}`);
