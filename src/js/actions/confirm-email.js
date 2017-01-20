export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFRIM_EMAIL_SUCCESS = 'CONFRIM_EMAIL_SUCCESS';
export const CONFRIM_EMAIL_FAILURE = 'CONFRIM_EMAIL_FAILURE';

export const confirmEmailRequest = () => ({
  type: CONFIRM_EMAIL_REQUEST
});

export const confirmEmailSuccess = data => ({
  type: CONFRIM_EMAIL_SUCCESS,
  data
});

export const confirmEmailFailure = error => ({
  type: CONFRIM_EMAIL_FAILURE,
  error
});

export function confirmEmail (email) {

  return (dispatch) => {
    dispatch(confirmEmailRequest());
    // fetch('http://localhost:3000/email', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email })
    // })
    // .then((response) => {
    //   response.json()
    //     .then((data) => {
    //       dispatch(resetPasswordSuccess({
    //         message: 'Ok user is in database?'
    //       }));
    //     });
    // })
    // .catch((error) => {
    //   dispatch(resetPasswordFailure(error));
    // });
  };
}
