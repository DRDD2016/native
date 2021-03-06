import Config from 'react-native-config';
import { persistor } from '../init-store';
import { storeToken, storeUserId } from '../lib/credentials';
import initSocket from '../socket-router';

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

export function signupUser (firstname, surname, email, password, navigation) {

  return (dispatch) => {
    dispatch(signupUserRequest());
    fetch(`${Config.URI}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstname, surname, email, password })
    })
    .then((response) => {
      console.log('signupUser response:', response);
      response.json()
        .then((data) => {
          if (data.token && data.user_id) {
            persistor.resume();
            dispatch(signupUserSuccess({
              firstname: data.firstname,
              surname: data.surname,
              email: data.email,
              photo_url: data.photo_url,
              user_id: data.user_id
            }));
            storeUserId(data.user_id);
            storeToken(data.token);
            initSocket();
            navigation.navigate('uploadPhoto');

          } else {
            dispatch(signupUserFailure(data.error));
          }
        });
    })
    .catch((error) => {
      dispatch(signupUserFailure(error.message));
    });
  };
}
