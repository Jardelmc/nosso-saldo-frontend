import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5c60796e.ngrok.io/',
});

export default api;
