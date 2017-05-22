export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const STORE_SOCKET = 'STORE_SOCKET';
export const STORE_INCOMING_LINK = 'STORE_INCOMING_LINK';

export const setIsConnected = isConnected => ({
  type: 'SET_IS_CONNECTED',
  isConnected
});

export const storeSocket = socket => ({
  type: STORE_SOCKET,
  socket
});

export const storeIncomingLink = inComingLink => ({
  type: STORE_INCOMING_LINK,
  inComingLink
});
