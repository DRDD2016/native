export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const sendEmailRequest = () => ({
  type: SEND_EMAIL_REQUEST
});

export const sendEmailSuccess = data => ({
  type: SEND_EMAIL_SUCCESS,
  data
});

export const sendEmailFailure = error => ({
  type: SEND_EMAIL_FAILURE,
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
