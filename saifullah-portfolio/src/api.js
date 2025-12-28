import axios from 'axios';

// Change this line directly to your Railway URL
const api = axios.create({
  baseURL: 'https://saifullah-portfolio-b.up.railway.app/api'
});

export default api;