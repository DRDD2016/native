import update from 'immutability-helper';
import * as actions from '../actions/login';

export const initialState = {
  email: '',
  password: '',
  isAuthenticating: false,
  userIsAuthenticated: undefined,
  error: undefined
};

export default function login (state = initialState, action) {
  switch (action.type) {

    case actions.UPDATE_TEXT_INPUT:
      return update(state, {
        [action.inputType]: { $set: action.data }
      });

    case actions.AUTHENTICATE_USER_REQUEST:
      return update(state, {
        isAuthenticating: { $set: true }
      });

    case actions.AUTHENTICATE_USER_SUCCESS:
      return initialState;

    case actions.AUTHENTICATE_USER_FAILURE:
      return update(state, {
        isAuthenticating: { $set: false },
        error: { $set: action.error },
        password: { $set: '' }
      });

    default:
      return state;
  }
}
