import API from './baseService';
import { Settings } from '../../config';

export const login = async (credentials) => {
    await API.post('/users/login', JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response)
      return response;
    });
}

export const checkToken = async (token) => {
    await API.get('/users/me', null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      }
    }).then((response) => {
      return response.data;
    })
}