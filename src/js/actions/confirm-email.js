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
