import axios from 'axios';

const api = axios.create({
  // Reads from Render's environment variable, or falls back to your live URL
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'https://portfolio-69hb.onrender.com') + '/api'
});

export default api;
