import Config from 'react-native-config';

export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

export const confirmEmailRequest = () => ({
  type: CONFIRM_EMAIL_REQUEST
});

export const confirmEmailSuccess = data => ({
  type: CONFIRM_EMAIL_SUCCESS,
  data
});

export const confirmEmailFailure = error => ({
  type: CONFIRM_EMAIL_FAILURE,
  error
});

export function confirmEmail (email) {
  console.log('email', email);
  return (dispatch) => {
    dispatch(confirmEmailRequest());
    fetch(`${Config.URI}/reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            dispatch(confirmEmailFailure(data.error));
          } else {
            console.log('data', data);
            dispatch(confirmEmailSuccess(data));
          }
        })
        .catch(err => dispatch(confirmEmailFailure(err)));
    })
    .catch((err) => {
      dispatch(confirmEmailFailure(err));
    });
  };
}
