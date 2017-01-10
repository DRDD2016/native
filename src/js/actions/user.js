import getUserID from '../lib/getUserID';
// import { feedSocket } from '../socket';
export const GET_USER = 'GET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const EDIT_NAME = 'EDIT_NAME';
export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';

export const CHANGE_NAME = 'CHANGE_NAME';

/*
* GET USER ACTIONS
*/

export function getUser () {
  const id = getUserID(); //eslint-disable-line
  return (dispatch) => {
    dispatch(getUserRequest());

    // axios.get(`${HOME_URL}/get-user?userID=${id}`)
    // .then((response) => {
    //   dispatch(getUserSuccess(response.data));
    // })
    // .catch((error) => {
    //   dispatch(getUserFailure(error));
    // });
  };
}

export function getUserRequest () {
  return {
    type: GET_USER_REQUEST,
    isFetching: true
  };
}

export function getUserSuccess (data) {
  return {
    type: GET_USER_SUCCESS,
    isFetching: false,
    data
  };
}

export function getUserFailure (error) {
  return {
    type: GET_USER_FAILURE,
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
    userID: getUserID()
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
