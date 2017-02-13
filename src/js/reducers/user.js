import update from 'immutability-helper';
import * as signup from '../actions/signup';
import * as login from '../actions/login';
import * as profile from '../actions/profile.old';
// import { LOGIN_USER_REQUEST } from '../actions/login';

export const initialState = {
  isSigningUp: false, // change that to isFetching
  isLoggingIn: false,
  error: undefined,
  firstname: '',
  surname: '',
  email: '',
  photo_url: '',
  user_id: '',
  isFetching: false
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case login.LOGIN_USER_REQUEST:
      return update(state, {
        isLoggingIn: { $set: true }
      });
    case profile.EDIT_NAME_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case profile.CHANGE_NAME:
      return handleChangeName(state, action);

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
        email: { $set: action.data.email },
        photo_url: { $set: action.data.photo_url || 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=39609ba001601e7ff5dd1bdede8bb0da&oe=58CEA14F' }, // eslint-disable-line
        user_id: { $set: action.data.user_id }
      });

    case profile.EDIT_NAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        firstname: action.data.firstname,
        surname: action.data.surname
      };
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

function handleChangeName (state, action) {
  if (action.category === 'firstname') {
    const newState = update(state, {
      firstname: { $set: action.value }
    });
    return newState;
  }
  if (action.category === 'surname') {
    const newState = update(state, {
      surname: { $set: action.value }
    });
    return newState;
  }
}
