import axios from 'axios';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.nossosaldo.life'
    : 'http://192.168.3.110:3900';

const api = axios.create({
  baseURL: serverUrl,
});

export default api;
