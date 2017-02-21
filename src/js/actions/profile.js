export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';
export const CHANGE_NAME = 'CHANGE_NAME';
export const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';

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

export function editName (token, user_id, firstname, surname) {
  return (dispatch) => {
    dispatch(editNameRequest());
    fetch(`${process.env.HOST}:${process.env.PORT}/users/${user_id}`, {
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
      .catch(err => dispatch(editNameFailure(err)));
    })
    .catch((err) => {
      dispatch(editNameFailure(err));
    });
  };
}

export function uploadPhoto (token, formData) {
  return (dispatch) => {
    dispatch(uploadPhotoRequest());
    fetch(`${process.env.HOST}:${process.env.PORT}/upload`, {
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
      .catch(err => dispatch(uploadPhotoFailure(err)));
    })
    .catch((err) => {
      dispatch(uploadPhotoFailure(err));
    });
  };
}
