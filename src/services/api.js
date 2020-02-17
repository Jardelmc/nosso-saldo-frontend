import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.3.110:3900',
});

export default api;
