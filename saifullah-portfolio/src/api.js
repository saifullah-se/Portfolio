// src/api.js

// Dynamically use the Backend URL from environment variables
const backendBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Export this to use in your components like: <img src={`${MEDIA_URL}${project.image}`} />
export const MEDIA_URL = backendBaseURL;