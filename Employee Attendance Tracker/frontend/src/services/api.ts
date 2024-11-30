import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string, role: string) => {
  const response = await api.post('/auth/register', { name, email, password, role });
  return response.data;
};

export const checkIn = async () => {
  const response = await api.post('/attendance/check-in');
  return response.data;
};

export const checkOut = async () => {
  const response = await api.post('/attendance/check-out');
  return response.data;
};

export const getAttendanceHistory = async (userId?: string) => {
  const url = userId ? `/attendance/history/${userId}` : '/attendance/history';
  const response = await api.get(url);
  return response.data;
};

export const getEmployees = async () => {
  const response = await api.get('/users/employees');
  
  return response.data;
}; 