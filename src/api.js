import axios from 'axios';

const API = axios.create({
  baseURL: 'https://msb-backend-5km0.onrender.com/api', // <--- notice /api
});

export default API;
