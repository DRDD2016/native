import * as signup from '../actions/signup';
import * as login from '../actions/login';
import * as profile from '../actions/profile';
import * as push from '../actions/push';

export const initialState = {
  isSigningUp: false,
  isLoggingIn: false,
  error: undefined,
  firstname: '',
  surname: '',
  email: '',
  photo_url: '',
  user_id: '',
  push_info: '',
  user_update_no: undefined,
  isFetching: false,
  isFetchingUpload: false,
  errorUpdate: undefined,
  errorUpload: undefined,
  errorUpdateNo: undefined
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case login.LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        error: undefined
      };
    case login.LOGIN_USER_RESET:
      return {
        ...state,
        isLoggingIn: false,
        error: undefined
      };
    case profile.EDIT_NAME_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case profile.GOT_IT_WHATS_NEW_REQUEST:
      return {
        ...state,
        user_update_no: action.data
      };
    case profile.UPLOAD_PHOTO_REQUEST:
      return {
        ...state,
        isFetchingUpload: true
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
        photo_url: action.data.photo_url,
        user_id: action.data.user_id,
        error: undefined
      };

    case profile.UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        photo_url: action.data.photo_url,
        isFetchingUpload: false
      };
    case profile.EDIT_NAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        firstname: action.data.firstname,
        surname: action.data.surname
      };
    case profile.GOT_IT_WHATS_NEW_SUCCESS:
      return {
        ...state
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
    case profile.GOT_IT_WHATS_NEW_FAILURE:
      return {
        ...state,
        errorUpdateNo: action.error
      };
    case profile.UPLOAD_PHOTO_FAILURE:
      return {
        ...state,
        isFetchingUpload: false,
        errorUpload: action.error
      };
    case push.EDIT_PUSHINFO_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case push.EDIT_PUSHINFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        push_info: action.data.push_info
      };
    case push.EDIT_PUSHINFO_FAILURE:
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
