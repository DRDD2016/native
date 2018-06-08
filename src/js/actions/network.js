
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const STORE_SOCKET = 'STORE_SOCKET';
export const STORE_INCOMING_LINK = 'STORE_INCOMING_LINK';
export const DELETE_INCOMING_LINK = 'DELETE_INCOMING_LINK';
export const STORE_INCOMING_LINK_ERROR = 'STORE_INCOMING_LINK_ERROR';
export const SUBSCRIBE_BRANCH = 'SUBSCRIBE_BRANCH';
export const LINKDATA_FROM_BRANCH = 'LINKDATA_FROM_BRANCH';

export const setIsConnected = isConnected => ({
  type: 'SET_IS_CONNECTED',
  isConnected
});

export const storeSocket = socket => ({
  type: STORE_SOCKET,
  socket
});

export const subscribeToBranch = () => ({
  type: SUBSCRIBE_BRANCH
});

export const linkDatafromBranch = () => ({
  type: LINKDATA_FROM_BRANCH
});

export const storeIncomingLink = inComingLinkCode => ({
  type: STORE_INCOMING_LINK,
  inComingLinkCode
});

export const removeIncomingLink = inComingLinkCode => ({
  type: DELETE_INCOMING_LINK,
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
    dispatch(removeIncomingLink('none'));

  };
}
