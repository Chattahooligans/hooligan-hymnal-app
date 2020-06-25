import axios from 'axios';
import { Urls } from '../../config';

let API = axios.create({
  baseURL: Urls.HooliganHymnalServer.replace(/\/$/, ""),
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
