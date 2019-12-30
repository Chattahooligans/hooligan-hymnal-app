import API from './baseService';

export const getSgVoices = () =>
  API.get('/api/sgVoices').then(response => response.data);
