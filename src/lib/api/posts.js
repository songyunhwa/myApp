import client from './client';
import qs from 'qs';

export const writePost = ({title, body, price, tags, category, imagepath})=>
client.post('/api/posts', {title,body,price, tags, category,imagepath});

export const readPost = id =>client.get(`/api/posts/${id}`);

export const listPosts = ({page, username, tag, category, title})=>{
    const queryString = qs.stringify({
        page,
        username,
        category,
        tag,
        title,
    }); 

     return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({id, title, body, price, tags, category,imagepath})=>
client.patch(`/api/posts/${id}`, {
    title,
    body,
    price,
    tags,
    category,
    imagepath
});

export const removePost = id=>client.delete(`/api/posts/${id}`);

export const uploadImage = ({formData})=>client.post("/api/upload", formData);
