import API from './baseService';

export const getSongbook = () =>
  API.get('/api/songbook').then(response => response.data);
