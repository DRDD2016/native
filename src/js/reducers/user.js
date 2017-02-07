import update from 'immutability-helper';
import * as signup from '../actions/signup';
import * as login from '../actions/login';
// import { LOGIN_USER_REQUEST } from '../actions/login';

export const initialState = {
  isSigningUp: false,
  isLoggingIn: false,
  error: undefined,
  firstname: '',
  surname: '',
  email: ''
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case login.LOGIN_USER_REQUEST:
      return update(state, {
        isLoggingIn: { $set: true }
      });
    case signup.SIGNUP_USER_REQUEST:
      return update(state, {
        isSigningUp: { $set: true }
      });

    case signup.SIGNUP_USER_SUCCESS:
    case login.LOGIN_USER_SUCCESS:
      return update(state, {
        isSigningUp: { $set: false },
        isLoggingIn: { $set: false },
        firstname: { $set: action.data.firstname },
        surname: { $set: action.data.surname },
        email: { $set: action.data.email }
      });

    case signup.SIGNUP_USER_FAILURE:
    case login.LOGIN_USER_FAILURE:
      return update(state, {
        isSigningUp: { $set: false },
        isLoggingIn: { $set: false },
        error: { $set: action.error }
      });

    default:
      return state;
  }
}
