import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthed: false,
  user: null,
  otpData: {
    phone: '',
    hash: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      if (action.payload) state.isAuthed = true;
      else state.isAuthed = false;
    },
    setOtpData: (state, action) => {
      state.otpData = action.payload;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectOtpData = (state) => state.auth.otpData;
export const selectAuth = (state) => state.auth.isAuthed;

export const { setAuth, setOtpData } = authSlice.actions;
export default authSlice.reducer;
