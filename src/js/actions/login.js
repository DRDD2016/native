import Config from 'react-native-config';
import { NavigationActions } from '@exponent/ex-navigation';
import { store } from '../init-store';
import Router from '../router';
import { storeToken, storeUserId } from '../lib/credentials';

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
    fetch(`${Config.URI}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      response.json()
        .then((data) => {
          dispatch(loginUserSuccess({
            firstname: data.firstname,
            surname: data.surname,
            email: data.email,
            user_id: data.user_id,
            photo_url: data.photo_url
          }));
          if (data.token && data.user_id) {
            storeToken(data.token);
            storeUserId(data.user_id);
            const navigatorUID = store.getState().navigation.currentNavigatorUID;
            dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('navbar')], 0));
          } else {
            dispatch(loginUserFailure(data.error));
          }
        });
    })
    .catch((error) => {
      dispatch(loginUserFailure(error));
    });
  };
}


export const logout = () => ({
  type: LOGOUT
});
