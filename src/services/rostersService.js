import API from './baseService';

export const getRosters = () =>
  API.get('/api/rosters').then(response => response.data);
