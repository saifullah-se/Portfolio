import axios from 'axios';

// Temporarily hardcode the live URL to bypass any Env Var issues
const baseURL = 'https://saifullah-portfolio-b.up.railway.app'; 

const api = axios.create({
  baseURL: `${baseURL}/api/`
});

export const MEDIA_URL = baseURL;

export default api;