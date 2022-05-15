import { api } from './index';

export const sendOtp = (phone) => api.post('/send-otp', { phone });
export const verifyOtp = (phone, otp, hash) =>
  api.post('/verify-otp', { phone, otp, hash });
