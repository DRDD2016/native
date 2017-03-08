import Config from 'react-native-config';

export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';
export const CHANGE_NAME = 'CHANGE_NAME';
export const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';
export const LOGOUT = 'LOGOUT';
export const STORE_SOCKET = 'STORE_SOCKET';

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

export const storeSocket = socket => ({
  type: STORE_SOCKET,
  socket
});

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
      res.json()
      .then((data) => {
        dispatch(uploadPhotoSuccess(data));
      })
      .catch(() => dispatch(uploadPhotoFailure('Something went wrong')));
    })
    .catch(() => {
      dispatch(uploadPhotoFailure('Something went wrong'));
    });
  };
}
