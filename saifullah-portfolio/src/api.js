// src/api.js
import axios from 'axios';

// FORCE the live URL here
const baseURL = 'https://saifullah-portfolio-b.up.railway.app'; 

const api = axios.create({
  baseURL: `${baseURL}/api/`
});

export default api;