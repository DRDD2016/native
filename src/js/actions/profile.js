import Config from 'react-native-config';

export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';
export const CHANGE_NAME = 'CHANGE_NAME';
export const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';
export const LOGOUT = 'LOGOUT';
export const GOT_IT_WHATS_NEW_REQUEST = 'GOT_IT_WHATS_NEW_REQUEST';
export const GOT_IT_WHATS_NEW_SUCCESS = 'GOT_IT_WHATS_NEW_SUCCESS';
export const GOT_IT_WHATS_NEW_FAILURE = 'GOT_IT_WHATS_NEW_FAILURE';


export const changeName = (value, category) => ({
  type: CHANGE_NAME,
  value,
  category
});

export const editNameRequest = () => ({
  type: EDIT_NAME_REQUEST
});

export const editNameSuccess = data => ({
  type: EDIT_NAME_SUCCESS,
  data
});

export const editNameFailure = error => ({
  type: EDIT_NAME_FAILURE,
  error
});

export const uploadPhotoRequest = () => ({
  type: UPLOAD_PHOTO_REQUEST
});

export const uploadPhotoSuccess = data => ({
  type: UPLOAD_PHOTO_SUCCESS,
  data
});

export const uploadPhotoFailure = error => ({
  type: UPLOAD_PHOTO_FAILURE,
  error
});

export const logout = () => ({
  type: LOGOUT
});

export const gotItWhatsNewRequest = data => ({
  type: GOT_IT_WHATS_NEW_REQUEST,
  data
});

export const gotItWhatsNewSuccess = () => ({
  type: GOT_IT_WHATS_NEW_SUCCESS
});

export const gotItWhatsNewFailure = error => ({
  type: GOT_IT_WHATS_NEW_FAILURE,
  error
});

export function gotItWhatsNew (token, user_id, update_no) {
  return (dispatch) => {
    dispatch(gotItWhatsNewRequest(update_no));
    fetch(`${Config.URI}/savePush/${user_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ user: { update_no } })
    })
    .then((response) => {
      console.log('response', response);
      response.json()
      .then((data) => {
        if (data.error) {
          dispatch(gotItWhatsNewFailure(data.error));
        } else {
          console.log('successfully saved push details to server');
          dispatch(gotItWhatsNewSuccess());
        }
      });
    })
    .catch((error) => {
      dispatch(gotItWhatsNewFailure(error.message));
    });
  };
}

export function editName (token, user_id, firstname, surname) {
  return (dispatch) => {
    dispatch(editNameRequest());
    fetch(`${Config.URI}/users/${user_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ user: { firstname, surname } })
    })
    .then((res) => {
      res.json()
      .then((data) => {
        dispatch(editNameSuccess(data));
      })
      .catch(err => dispatch(editNameFailure(err.message)));
    })
    .catch((err) => {
      dispatch(editNameFailure(err.message));
    });
  };
}

export function uploadPhoto (token, formData) {
  console.log('Photo formData: ', formData);
  console.log('UploadPhotoURL: ', `${Config.URI}/upload`);
  console.log('token: ', token);
  return (dispatch) => {
    dispatch(uploadPhotoRequest());
    fetch(`${Config.URI}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        authorization: token
      },
      body: formData
    })
    .then((res) => {
      console.log('res', res);
      res.json()
      .then((data) => {
        console.log('Photo response data: ', data);
        dispatch(uploadPhotoSuccess(data));
      })
      .catch((e) => {
        console.log('Photo response error: ', e);
        dispatch(uploadPhotoFailure('Something went wrong'));
      });
    })
    .catch((e) => {
      console.log('Photo response error: ', JSON.stringify(e));
      dispatch(uploadPhotoFailure('Something went wrong'));
    });
  };
}
