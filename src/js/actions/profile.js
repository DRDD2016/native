import Config from 'react-native-config';
import { store } from '../init-store';

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
export const UPDATE_OPEN_NO_REQUEST = 'UPDATE_OPEN_NO_REQUEST';
export const UPDATE_OPEN_NO_SUCCESS = 'UPDATE_OPEN_NO_SUCCESS';
export const UPDATE_OPEN_NO_FAILURE = 'UPDATE_OPEN_NO_FAILURE';
export const GET_USERNOS_REQUEST = 'GET_USERNOS_REQUEST';
export const GET_USERNOS_SUCCESS = 'GET_USERNOS_SUCCESS';
export const GET_USERNOS_FAILURE = 'GET_USERNOS_FAILURE';

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

export const UpdateOpenNoRequest = data => ({
  type: UPDATE_OPEN_NO_REQUEST,
  data
});

export const UpdateOpenNoSuccess = () => ({
  type: UPDATE_OPEN_NO_SUCCESS
});

export const UpdateOpenNoFailure = error => ({
  type: UPDATE_OPEN_NO_FAILURE,
  error
});

export const getUserNoByIdRequest = () => ({
  type: GET_USERNOS_REQUEST
});

export const getUserNoByIdSuccess = data => ({
  type: GET_USERNOS_SUCCESS,
  data
});

export const getUserNoByIdFailure = error => ({
  type: GET_USERNOS_FAILURE,
  error
});

export function getUserNoById (token, user_id) {
  return (dispatch) => {

    dispatch(getUserNoByIdRequest());
    console.log('getUserNoById action for id: ', user_id);

    fetch(`${Config.URI}/userNos/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        console.log('getUserNos response data:', data);
        const latestUpdateNo = (store.getState().user.user_update_no > data.update_no) ? store.getState().user.user_update_no : data.update_no;
        const latestOpenNo = (store.getState().user.user_open_no > data.open_no) ? store.getState().user.user_open_no : data.open_no;
        const userNosData = {
          update_no: latestUpdateNo,
          open_no: latestOpenNo
        };
        dispatch(getUserNoByIdSuccess(userNosData));

      })
      .catch((err) => {
        console.log('caught getUser error: ', err);
        dispatch(getUserNoByIdFailure(err.message));
      });
    })
    .catch((err) => {
      console.log('caught getUser error: ', err);
      dispatch(getUserNoByIdFailure(err.message));
    });
  };
}


export function gotItWhatsNew (token, user_id, user_update_no) {
  return (dispatch) => {
    dispatch(gotItWhatsNewRequest(user_update_no));
    fetch(`${Config.URI}/saveUpdateNo/${user_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ user: { user_update_no } })
    })
    .then((response) => {
      console.log('response', response);
      response.json()
      .then((data) => {
        if (data.error) {
          dispatch(gotItWhatsNewFailure(data.error));
        } else {
          console.log('successfully saved update_no to server');
          dispatch(gotItWhatsNewSuccess());
        }
      });
    })
    .catch((error) => {
      dispatch(gotItWhatsNewFailure(error.message));
    });
  };
}

export function updateOpenNo (token, user_id, open_no) {
  return (dispatch) => {
    dispatch(UpdateOpenNoRequest(open_no));
    fetch(`${Config.URI}/saveOpenNo/${user_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ user: { open_no } })
    })
    .then((response) => {
      console.log('response', response);
      response.json()
      .then((data) => {
        if (data.error) {
          dispatch(UpdateOpenNoFailure(data.error));
        } else {
          console.log('successfully saved open_no to server');
          dispatch(UpdateOpenNoSuccess());
        }
      });
    })
    .catch((error) => {
      dispatch(UpdateOpenNoFailure(error.message));
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
