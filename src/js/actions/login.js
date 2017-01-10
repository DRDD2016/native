export const UPDATE_TEXT_INPUT = 'UPDATE_TEXT_INPUT';
export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST';
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';
export const LOGOUT = 'LOGOUT';

export const updateTextInput = (data, inputType) => ({
  type: UPDATE_TEXT_INPUT,
  data,
  inputType
});

export const authenticateUserRequest = () => ({
  type: AUTHENTICATE_USER_REQUEST
});

export const authenticateUserSuccess = data => ({
  type: AUTHENTICATE_USER_SUCCESS,
  data
});

export const authenticateUserFailure = error => ({
  type: AUTHENTICATE_USER_FAILURE,
  error
});


export function authenticateUser (email, password) { //eslint-disable-line

  return (dispatch) => {
    dispatch(authenticateUserRequest());
  };
}


export const logout = () => ({
  type: LOGOUT
});
