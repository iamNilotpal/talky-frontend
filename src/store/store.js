import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import activateReducer from './activateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activate: activateReducer,
  },
});
