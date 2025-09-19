// src/api.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL,
  // timeout: 10000, // optional
});

// request interceptor to attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;
