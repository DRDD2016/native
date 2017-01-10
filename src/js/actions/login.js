export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT = 'LOGOUT';


export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = data => ({
  type: LOGIN_USER_SUCCESS,
  data
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  error
});

export function loginUser (email, password) {

  return (dispatch) => {
    dispatch(loginUserRequest());
  };
}


export const logout = () => ({
  type: LOGOUT
});
