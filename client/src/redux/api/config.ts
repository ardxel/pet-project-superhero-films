import { getTokenFromLocalStorage } from '@common/tools';
import BASE_URL from '@constants/baseUrl';
import axios from 'axios';

export interface BaseResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
});

instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use((response) => {
  // if respone has token in data object then add it in localStorage;
  if (response && response.data && response.data.data && response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
  }
  return response;
});

export default instance;
