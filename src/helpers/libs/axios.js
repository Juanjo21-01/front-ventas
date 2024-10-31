import axios from 'axios';
import { useAuthStore } from '../../store/auth';

const api = axios.create({
  baseURL: 'https://api-ventas-intecap-production.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
