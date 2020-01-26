import API from './baseService';

export const getPost = (postId) =>
  API.get('/api/feed/' + postId).then(response => response.data);

export const getFeed = () =>
  API.get('/api/feed/').then(response => response.data);

export const createPost = (post, token) =>
  API.post(
    '/api/feed',
    post,
    {
      headers: {
        'Authorization': "Bearer " + token
      }
    }
  )
    .then(response => response.data);

export const hidePost = (postId, token) =>
  API.delete(
    '/api/feed/' + postId + "/active",
    {
      headers: {
        'Authorization': "Bearer " + token
      }
    }
  )
    .then(response => response.data);

