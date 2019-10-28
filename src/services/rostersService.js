import API from './baseService';

export const getRosters = () =>
  API.get('/api/rosters/active').then(response => response.data);
