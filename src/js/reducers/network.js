import * as actions from '../actions/network';

const initialState = {
  isConnected: true
};

const network = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_IS_CONNECTED:
      return {
        isConnected: action.isConnected
      };

    default:
      return state;
  }
};

export default network;
