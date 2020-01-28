import API from './baseService';
import { Settings } from '../config/Settings';

export const getPost = (postId) =>
  API.get('/api/feed/' + postId).then(response => response.data);

export const getFeed = () => 
  API.get('/api/feed/?limit=' + Settings.Home_PostsPerPage).then(response => response.data);

export const getMoreFeed = (publishedBefore) => 
  API.get('/api/feed/?publishedBefore=' + publishedBefore + '&limit=' + Settings.Home_PostsPerPage).then(response => response.data);

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

export const engageNotification = (postId, pushToken) =>
  API.post(
    '/api/notifications/' + postId + '/engagements',
    {
      pushToken: pushToken,
      engagedAt: (new Date()).toISOString()
    }
  )
    .then(response => response.data)