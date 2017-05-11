import * as actions from '../actions/network';

const initialState = {
  isConnected: true,
  socket: undefined
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

    default:
      return state;
  }
};

export default network;
