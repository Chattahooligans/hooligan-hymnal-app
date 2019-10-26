import API from './baseService';

export const getRoster = () =>
  API.get('/api/roster/active').then(response => response.data);
