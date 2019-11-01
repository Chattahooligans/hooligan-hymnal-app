import API from './baseService';

export const getSongbooks = () =>
  API.get('/api/songbooks').then(response => response.data);
