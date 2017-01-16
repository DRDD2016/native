export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = data => ({
  type: RESET_PASSWORD_SUCCESS,
  data
});

export const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  error
});


export function newPassword (password) {

  return (dispatch) => {
    dispatch(resetPasswordRequest());
    // fetch('http://localhost:3000/resetPassword', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ password })
    // })
    // .then((response) => {
    //   response.json()
    //     .then((data) => {
    //       dispatch(resetPasswordSuccess({
    //         message: 'ok'
    //       }));
    //     });
    // })
    // .catch((error) => {
    //   dispatch(resetPasswordFailure(error));
    // });
  };
}
