import Config from 'react-native-config';
import { NavigationActions } from '@exponent/ex-navigation';
// import Fabric from 'react-native-fabric';
import { store, persistor } from '../init-store';
import Router from '../router';
import { storeToken, storeUserId } from '../lib/credentials';
import initSocket from '../socket-router';

// const { Answers } = Fabric;

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
      if (response.status === 401) {
        dispatch(loginUserFailure('Wrong email or password!'));
      }
      response.json()
        .then((data) => {
          if (data.token && data.user_id) {
            persistor.resume();
            // Answers.logCustom('SuccessfulLogin', { emailData: email });
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
            const navigatorUID = store.getState().navigation.currentNavigatorUID;
            dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('tabBar')], 0));
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
