// frontend/src/api.js
import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: `${BASE}/api`,
  timeout: 15000,
});

export default API;
