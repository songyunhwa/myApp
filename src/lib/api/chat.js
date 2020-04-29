import client from './client';
import qs from 'qs';

export const writeChat = ({id, body})=>
client.post(`/api/chat`, {id, body});

export const listChat = ({id, username})=>{
     const queryString = qs.stringify({
          id,
          username,
      }); 
  
      console.log(queryString);
      
     return client.get(`/api/chat?${queryString}`);
};

//현재 사용 안함.
export const removeChat = ({id, username})=>client.delete(`/api/chat/${id}/${username}`);
