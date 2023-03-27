import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getStoredToken, refreshToken } from '../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const token = getStoredToken();
    if (err.response.status === StatusCodes.UNAUTHORIZED && token) {
      refreshToken();
    }
    return Promise.reject(err);
  }
);

export { api };
