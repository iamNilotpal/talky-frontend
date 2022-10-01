import axios from 'axios';
import { api } from './index';

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
  },
);

const sendOtp = (data) => api.post('/send-otp', data);
const verifyOtp = (data) => api.post('/verify-otp', data);
const activateUser = (data) => api.post('/activate', data);
const logout = () => api.post('/logout');

export { sendOtp, verifyOtp, activateUser, logout };
