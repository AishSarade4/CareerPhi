import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData)
};

export const loans = {
  create: (loanData: any) => api.post('/loans', loanData),
  getUserLoans: () => api.get('/loans/user'),
  getAllLoans: () => api.get('/loans'),
  updateStatus: (id: string, status: string) =>
    api.patch(`/loans/${id}`, { status })
};

export default api;