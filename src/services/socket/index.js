import { io } from 'socket.io-client';

const CONNECTION_OPTIONS = {
  forceNew: true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

export const initSocket = () =>
  io(process.env.REACT_APP_API_BASE_URL, CONNECTION_OPTIONS);
