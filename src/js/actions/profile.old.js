// import { feedSocket } from '../socket';
export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';

export const CHANGE_NAME = 'CHANGE_NAME';

/*
* GET PROFILE ACTIONS
*/

// export function getProfile (token, user_id) {
//   return (dispatch) => {
//     dispatch(getProfileRequest());
//     fetch(`http://localhost:3000/users/${user_id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         authorization: token
//       }
//     })
//     .then((res) => {
//       res.json()
//       .then((data) => {
//         dispatch(getProfileSuccess(data));
//       })
//       .catch(err => dispatch(getProfileFailure(err)));
//     })
//     .catch(err => dispatch(getProfileFailure(err)));
//   };
// }

// export function getProfileRequest () {
//   return {
//     type: GET_PROFILE_REQUEST,
//     isFetching: true
//   };
// }
//
// export function getProfileSuccess (data) {
//   return {
//     type: GET_PROFILE_SUCCESS,
//     isFetching: false,
//     data
//   };
// }
//
// export function getProfileFailure (error) {
//   return {
//     type: GET_PROFILE_FAILURE,
//     isFetching: false,
//     error
//   };
// }

/*
CHANGE NAME ACTIONS
*/

export function changeName (value, category) {
  return {
    type: CHANGE_NAME,
    value,
    category
  };
}

/*
EDIT NAME ACTIONS
*/

export function editName (firstname, surname) {
  const payload = { //eslint-disable-line
    firstname,
    surname
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
