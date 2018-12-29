import Config from 'react-native-config';

export const EDIT_PUSH_REQUEST = 'EDIT_PUSH_REQUEST';
export const EDIT_PUSH_SUCCESS = 'EDIT_PUSH_SUCCESS';
export const EDIT_PUSH_FAILURE = 'EDIT_PUSH_FAILURE';

export function savePushRequest () {
  return {
    type: EDIT_PUSH_REQUEST
  };
}

export function savePushSuccess () {
  return {
    type: EDIT_PUSH_SUCCESS
  };
}

export function savePushFailure (error) {
  return {
    type: EDIT_PUSH_FAILURE,
    error
  };
}

export function savePush (token, user_id, push_info) { //eslint-disable-line
  console.log('savePush about to start: ', push_info);
  return (dispatch) => {
    console.log('savePush starting: ', push_info);
    dispatch(savePushRequest());
    fetch(`${Config.URI}/savePush/${user_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { push_info } })
    })
    .then((response) => {
      console.log('savePush response', response);
      response.json()
      .then((data) => {
        if (data.error) {
          dispatch(savePushFailure(data.error));
        } else {
          console.log('successfully saved push details to server');
          dispatch(savePushSuccess());
        }
      });
    })
    .catch((error) => {
      dispatch(savePushFailure(error.message));
    });
  };
}
