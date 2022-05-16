import axios from 'axios';

import { api } from './index';

export const sendOtp = (phone) => api.post('/send-otp', { phone });
export const verifyOtp = (phone, otp, hash) =>
  api.post('/verify-otp', { phone, otp, hash });
export const activateUser = (data) => api.post('/activate', data);
export const logout = () => api.post('/logout');

/* Refreshing Tokens in Background */
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/refresh-tokens`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch ({ response }) {
        console.error(response);
      }
    }
    throw error;
  }
);
