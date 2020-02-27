import axios from 'axios';
import { HOOLIGAN_HYMNAL_SERVER_ADDRESS } from '../config/Settings';

let API = axios.create({
  baseURL: HOOLIGAN_HYMNAL_SERVER_ADDRESS.replace(/\/$/, ""),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
/*
API.interceptors.request.use(request => {
  console.log('Starting Request\n', request)
  return request
})
API.interceptors.response.use(response => {
  console.log('Response\n', response)
  return response
})
*/

export default API;
