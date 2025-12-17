// axiosInstance.js
import axios from 'axios';
import { getDeviceUUID } from '../utils/uuid';
import { refreshAccessToken as refreshTokenApi } from '../api/authApi';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Use .env for base URL or hard-code it
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createApiInstance = (prefix = '') => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}/${prefix}`,
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: function (status) {
      return status >= 200 && status < 400; 
    },
  });

  instance.interceptors.request.use(async config => {
    const token = localStorage.getItem('accessToken');
    const sessionToken = localStorage.getItem('sessionToken');
    const installationId = localStorage.getItem('x-installation-id');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (sessionToken) {
      config.headers.session = sessionToken;
    }
    if (installationId) {
      config.headers['x-installation-id'] = installationId;
    }

    return config;
  }, error => Promise.reject(error));

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const tokenData = await refreshTokenApi();
          const { accessToken, refreshToken } = tokenData;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          return instance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
