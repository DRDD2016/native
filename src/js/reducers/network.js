import * as actions from '../actions/network';


const initialState = {
  isConnected: undefined,
  socket: undefined,
  inComingLinkCode: 'none',
  inComingLinkError: undefined,
  isFetching: false,
  isFetchingBranch: false
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

    case actions.SUBSCRIBE_BRANCH:
      return {
        ...state,
        isFetchingBranch: true
      };

    case actions.LINKDATA_FROM_BRANCH:
      return {
        ...state,
        isFetchingBranch: false
      };

    case actions.STORE_INCOMING_LINK:
      return {
        ...state,
        inComingLinkCode: action.inComingLinkCode,
        isFetching: true
      };

    case actions.DELETE_INCOMING_LINK:
      return {
        ...state,
        inComingLinkCode: action.inComingLinkCode,
        isFetching: false
      };

    case actions.STORE_INCOMING_LINK_ERROR:
      return {
        ...state,
        inComingLinkError: action.inComingLinkError,
        isFetching: false
      };

    default:
      return state;
  }
};

export default network;
