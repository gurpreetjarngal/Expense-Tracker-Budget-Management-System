import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

if (import.meta.env.PROD && apiBaseUrl === '/api') {
  console.warn(
    'VITE_API_URL is /api in production. This only works when the frontend and backend are deployed on the same domain. Set VITE_API_URL to your deployed backend URL, for example: https://your-api.onrender.com/api'
  );
}

const api = axios.create({
  baseURL: apiBaseUrl
});

let onUnauthorized = null;

export const setupApiInterceptors = ({ handleUnauthorized } = {}) => {
  onUnauthorized = handleUnauthorized || null;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onUnauthorized?.();
    }
    return Promise.reject(error);
  }
);

export default api;
