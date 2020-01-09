import axios from 'axios';
import { HYMNAL_ADDRESS } from '../config/server';

let API = axios.create({
  baseURL: HYMNAL_ADDRESS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
API.interceptors.request.use(request => {
  console.log('Starting Request\n', request)
  return request
})
API.interceptors.response.use(response => {
  console.log('Response\n', response)
  return response
})

export default API;
