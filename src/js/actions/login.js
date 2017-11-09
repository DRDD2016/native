import Config from 'react-native-config';
import { persistor } from '../init-store';
import { storeToken, storeUserId } from '../lib/credentials';
import initSocket from '../socket-router';


export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_RESET = 'LOGIN_USER_RESET';
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

export const loginUserReset = () => ({
  type: LOGIN_USER_RESET
});

export function loginUser (email, password, navigation) {

  return (dispatch) => {
    console.log('LOGIN WITHOUT RESET');
    dispatch(loginUserRequest());
    console.log(`${Config.URI}/login`);
    fetch(`${Config.URI}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      if (response.status === 401) {
        dispatch(loginUserFailure('Wrong email or password!'));
      }
      response.json()
        .then((data) => {
          if (data.token && data.user_id) {
            persistor.resume();
            dispatch(loginUserSuccess({
              firstname: data.firstname,
              surname: data.surname,
              email: data.email,
              user_id: data.user_id,
              photo_url: data.photo_url
            }));
            storeUserId(data.user_id);
            storeToken(data.token);
            initSocket();
            console.log('navigation: ', navigation);
            navigation.navigate('tabsMain');
          } else {
            dispatch(loginUserFailure(data.error));
          }
        })
        .catch(() => { dispatch(loginUserFailure('Wrong email or password!')); });
    })
    .catch(() => {
      dispatch(loginUserFailure('Wrong email or password!'));
    });
  };
}


export const logout = () => ({
  type: LOGOUT
});
