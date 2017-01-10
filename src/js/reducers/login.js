import update from 'immutability-helper';
import * as actions from '../actions/login';

export const initialState = {
  isLoggingIn: false,
  error: undefined
};

export default function login (state = initialState, action) {
  switch (action.type) {

    case actions.LOGIN_USER_REQUEST:
      return update(state, {
        isLoggingIn: { $set: true }
      });

    case actions.LOGIN_USER_SUCCESS:
      return initialState;

    case actions.LOGIN_USER_FAILURE:
      return update(state, {
        isLoggingIn: { $set: false },
        error: { $set: action.error }
      });

    default:
      return state;
  }
}
