import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { clearProfile } from '../features/userSlice';
import store from '../store';
import {
  clearStoredUser,
  getStoredRefreshToken,
  getStoredToken,
  storeToken,
} from '../utils/auth';

let isRefreshing = false;
let failedRequestQueue: {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
}[] = [];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${getStoredToken()}`,
  },
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      const refreshToken = getStoredRefreshToken();
      const originalConfig: AxiosRequestConfig = error.config!;

      if (!isRefreshing) {
        isRefreshing = true;
        api
          .post<{ token: string }>(
            'users/authenticate/refresh',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
          .then((res) => {
            const { token } = res.data;
            storeToken(token);

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            failedRequestQueue.forEach((req) => {
              req.onSuccess(token);
            });
            failedRequestQueue = [];
          })
          .catch((err) => {
            failedRequestQueue.forEach((req) => req.onFailure(err));
            failedRequestQueue = [];

            clearStoredUser();
            store.dispatch(clearProfile());
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers!['Authorization'] = `Bearer ${token}`;
            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }

    return Promise.reject(error);
  }
);

export { api };
