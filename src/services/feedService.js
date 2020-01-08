import API from './baseService';

export const getFeed = () =>
  API.get('/api/feed').then(response => response.data);

export const createPost = (post, token) =>
  API.post(
    '/api/feed',
    JSON.stringify(post),
    {
      headers: {
        'Authorization': "Bearer " + token
      }
    }
  )
    .then(response => response.data);
