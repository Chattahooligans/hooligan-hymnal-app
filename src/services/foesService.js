import API from './baseService';

export const getFoes = () =>
  API.get('/api/foes').then(response => response.data);