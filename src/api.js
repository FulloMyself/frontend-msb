// src/api.js
import axios from 'axios';

// Default to deployed backend if env variable is missing
const baseURL = process.env.REACT_APP_API_URL || 'https://msb-backend-5km0.onrender.com';

const API = axios.create({
  baseURL,
});

// Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
