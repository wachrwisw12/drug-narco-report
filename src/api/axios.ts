import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // URL backend
  timeout: 10000,
});

export default axiosInstance;
