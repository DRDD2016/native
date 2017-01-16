export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFRIM_EMAIL_SUCCESS = 'CONFRIM_EMAIL_SUCCESS';
export const CONFRIM_EMAIL_FAILURE = 'CONFRIM_EMAIL_FAILURE';

export const sendEmailRequest = () => ({
  type: CONFIRM_EMAIL_REQUEST
});

export const sendEmailSuccess = data => ({
  type: CONFRIM_EMAIL_SUCCESS,
  data
});

export const sendEmailFailure = error => ({
  type: CONFRIM_EMAIL_FAILURE,
  error
});

export function confirmEmail (email) {

  return (dispatch) => {
    dispatch(sendEmailRequest());
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
