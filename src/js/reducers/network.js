import * as actions from '../actions/network';

const initialState = {
  isConnected: true,
  socket: undefined,
  inComingLinkCode: 'none'
};

const network = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.isConnected
      };

    case actions.STORE_SOCKET:
      return {
        ...state,
        socket: action.socket
      };

    case actions.STORE_INCOMING_LINK:
      return {
        ...state,
        inComingLinkCode: action.inComingLinkCode
      };

    default:
      return state;
  }
};

export default network;
