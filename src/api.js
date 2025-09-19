import axios from 'axios';

const API = axios.create({
  baseURL: 'https://msb-backend-5km0.onrender.com/api', // add /api here
});

// attach token automatically
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default API;
