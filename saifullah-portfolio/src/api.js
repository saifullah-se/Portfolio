import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portfolio-69hb.onrender.com/api'
});

export default api;
