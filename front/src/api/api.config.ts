import axios from 'axios';

axios.defaults.withCredentials = true;

const headerConfig = {
  baseURL: 'http://localhost:3065',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Version': 'v1.0',
  },
};

const API = axios.create(headerConfig);

export { API };
