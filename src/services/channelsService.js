import API from './baseService';

export const getChannels = () =>
  API.get('/api/channels').then(response => response.data);
