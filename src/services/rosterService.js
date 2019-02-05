import API from './baseService';

export const getRoster = () =>
  API.get('/api/roster').then(response => response.data);
