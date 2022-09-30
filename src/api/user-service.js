import { api } from '.';

export const updatePersonalInfo = (data) => api.patch('/user/info', data);
export const updateAvatar = (avatar) => api.patch('/user/avatar', avatar);
export const deleteAccount = () => api.delete('/user/delete-account');
