import axios from 'axios';
import { HYMNAL_ADDRESS } from '../config/server';

export default axios.create({
  baseURL: HYMNAL_ADDRESS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
