import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthed: false,
  user: null,
  otpData: {
    email: '',
    phone: '',
    hash: '',
  },
  loading: false,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectOtpData = (state) => state.auth.otpData;
export const selectAuth = (state) => state.auth.isAuthed;
export const selectLoading = (state) => state.auth.loading;

export const { setAuth, setOtpData, setLoading } = authSlice.actions;
export default authSlice.reducer;
