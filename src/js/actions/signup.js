import { NavigationActions } from '@exponent/ex-navigation';
import { store } from '../init-store';
import Router from '../router';
import { storeToken, storeUserId } from '../lib/credentials';

export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const LOGOUT = 'LOGOUT';

export const signupUserRequest = () => ({
  type: SIGNUP_USER_REQUEST
});

export const signupUserSuccess = data => ({
  type: SIGNUP_USER_SUCCESS,
  data
});

export const signupUserFailure = error => ({
  type: SIGNUP_USER_FAILURE,
  error
});

export function signupUser (firstname, surname, email, password) {

  return (dispatch) => {
    dispatch(signupUserRequest());
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstname, surname, email, password })
    })
    .then((response) => {
      response.json()
        .then((data) => {
          dispatch(signupUserSuccess({
            firstname: data.firstname,
            surname: data.surname,
            email: data.email,
            photo_url: data.photo_url
          }));
          if (data.token && data.user_id) {
            storeToken(data.token);
            storeUserId(data.user_id);
            const navigatorUID = store.getState().navigation.currentNavigatorUID;
            dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('uploadPhoto')], 0));
          } else {
            dispatch(signupUserFailure(data.error));
          }
        });
    })
    .catch((error) => {
      dispatch(signupUserFailure(error));
    });
  };
}
