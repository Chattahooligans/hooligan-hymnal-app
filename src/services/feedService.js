import API from './baseService';

export const getFeed = () =>
  API.get('/api/feed').then(response => response.data);

export const createPost = (post) => 
    API.post('/api/feed', post).then(response => response.data);
