import * as signup from '../actions/signup';
import * as login from '../actions/login';
import * as profile from '../actions/profile';

export const initialState = {
  isSigningUp: false,
  isLoggingIn: false,
  error: undefined,
  firstname: '',
  surname: '',
  email: '',
  photo_url: '',
  user_id: '',
  isFetching: false,
  errorUpdate: undefined
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case login.LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      };
    case profile.EDIT_NAME_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case profile.CHANGE_NAME:
      return handleChangeName(state, action);

    case signup.SIGNUP_USER_REQUEST:
      return {
        ...state,
        isSigningUp: true
      };

    case signup.SIGNUP_USER_SUCCESS:
    case login.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isLoggingIn: false,
        firstname: action.data.firstname,
        surname: action.data.surname,
        email: action.data.email,
        photo_url: action.data.photo_url || 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=39609ba001601e7ff5dd1bdede8bb0da&oe=58CEA14F', // eslint-disable-line
        user_id: action.data.user_id
      };

    case profile.EDIT_NAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        firstname: action.data.firstname,
        surname: action.data.surname
      };
    case signup.SIGNUP_USER_FAILURE:
    case login.LOGIN_USER_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isLoggingIn: false,
        error: action.error
      };
    case profile.EDIT_NAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorUpdate: action.error
      };
    default:
      return state;
  }
}

function handleChangeName (state, action) {
  if (action.category === 'firstname') {
    return {
      ...state,
      firstname: action.value,
      isFetching: false
    };
  }
  if (action.category === 'surname') {
    return {
      ...state,
      surname: action.value,
      isFetching: false
    };
  }
}
