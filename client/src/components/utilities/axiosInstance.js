// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Needed for JWT cookies
  timeout: 10000, // Optional: 10 seconds
  headers: {
    'Content-Type': 'application/json', // Optional if using JSON only
  },
});

export default axiosInstance;
