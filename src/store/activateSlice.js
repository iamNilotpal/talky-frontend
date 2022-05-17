import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  avatar: '/images/monkey-avatar.svg',
  loading: false,
};

const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const selectName = (state) => state.activate.name;
export const selectAvatar = (state) => state.activate.avatar;
export const selectLoading = (state) => state.activate.loading;

export const { setName, setAvatar, setLoading } = activateSlice.actions;
export default activateSlice.reducer;
