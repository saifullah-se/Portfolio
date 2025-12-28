import axios from 'axios';

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",   // your backend
});

export const MEDIA_URL = "http://127.0.0.1:8000"; // 👈 Add this

export default api;
