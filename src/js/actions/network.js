export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const STORE_SOCKET = 'STORE_SOCKET';

export const setIsConnected = isConnected => ({
  type: 'SET_IS_CONNECTED',
  isConnected
});

export const storeSocket = socket => ({
  type: STORE_SOCKET,
  socket
});
