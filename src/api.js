// src/api.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://msb-backend-5km0.onrender.com';

const API = axios.create({
  baseURL,
  // optional timeout: 10000,
});

// Automatically attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor to catch auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.clear();
      alert('Session expired. Please login again.');
      window.location.href = '#/';
    }
    return Promise.reject(error);
  }
);

export default API;
