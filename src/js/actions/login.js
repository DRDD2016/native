import { NavigationActions } from '@exponent/ex-navigation';
import { store } from '../init-store';
import Router from '../router';
import storeToken from '../lib/store-token';

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
    fetch('http://localhost:3000/login', {
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
            email: data.email
          }));
          if (data.token) {
            storeToken(data.token);
            const navigatorUID = store.getState().navigation.currentNavigatorUID;
            dispatch(NavigationActions.push(navigatorUID, Router.getRoute('navbar')));
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
