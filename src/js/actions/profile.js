// import { feedSocket } from '../socket';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const EDIT_NAME = 'EDIT_NAME';
export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';

export const CHANGE_NAME = 'CHANGE_NAME';

/*
* GET PROFILE ACTIONS
*/

export function getProfile () {
  return (dispatch) => {
    dispatch(getProfileRequest());

    // axios.get(`${HOME_URL}/get-user?userID=${id}`)
    // .then((response) => {
    //   dispatch(getProfileSuccess(response.data));
    // })
    // .catch((error) => {
    //   dispatch(getProfileFailure(error));
    // });
  };
}

export function getProfileRequest () {
  return {
    type: GET_PROFILE_REQUEST,
    isFetching: true
  };
}

export function getProfileSuccess (data) {
  return {
    type: GET_PROFILE_SUCCESS,
    isFetching: false,
    data
  };
}

export function getProfileFailure (error) {
  return {
    type: GET_PROFILE_FAILURE,
    isFetching: false,
    error
  };
}

/*
CHANGE NAME ACTIONS
*/

export function changeName (value, inputType) {
  return {
    type: CHANGE_NAME,
    value,
    inputType
  };
}

/*
EDIT NAME ACTIONS
*/

export function editName (firstName, lastName) {
  const payload = { //eslint-disable-line
    firstName,
    lastName,
    userID: getProfileID()
  };

  return (dispatch) => {
    dispatch(editNameRequest());

    // axios.post('/edit-name', payload)
    // .then(() => {
    //   dispatch(editNameSuccess());
    // })
    // .catch((error) => {
    //   dispatch(editNameFailure(error));
    // });
  };
}

export function editNameRequest () {
  return {
    type: EDIT_NAME_REQUEST,
    isFetching: true
  };
}

export function editNameSuccess () {
  return {
    type: EDIT_NAME_SUCCESS,
    isFetching: false
  };
}

export function editNameFailure (error) {
  return {
    type: EDIT_NAME_FAILURE,
    isFetching: false,
    error
  };
}
