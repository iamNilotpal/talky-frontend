import { api } from '.';

export const createRoom = (data) => api.post('/rooms', data);
export const fetchRooms = () => api.get('/rooms');
export const fetchRoomData = (roomId) => api.get(`/room/${roomId}`, { roomId });
