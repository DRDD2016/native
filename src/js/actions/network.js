
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const STORE_SOCKET = 'STORE_SOCKET';
export const STORE_INCOMING_LINK = 'STORE_INCOMING_LINK';
export const STORE_INCOMING_LINK_ERROR = 'STORE_INCOMING_LINK_ERROR';

export const setIsConnected = isConnected => ({
  type: 'SET_IS_CONNECTED',
  isConnected
});

export const storeSocket = socket => ({
  type: STORE_SOCKET,
  socket
});

export const storeIncomingLink = inComingLinkCode => ({
  type: STORE_INCOMING_LINK,
  inComingLinkCode
});

export const storeIncomingLinkError = inComingLinkError => ({
  type: STORE_INCOMING_LINK_ERROR,
  inComingLinkError
});

export function saveIncomingLink (linkData) {

  return (dispatch) => {
    dispatch(storeIncomingLink(linkData));
  };
}

export function saveIncomingLinkError (error) {

  return (dispatch) => {
    dispatch(storeIncomingLinkError(error));
  };
}

export function deleteIncomingLink () {

  return (dispatch) => {
    dispatch(storeIncomingLink('none'));

  };
}
