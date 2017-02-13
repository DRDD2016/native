export const EDIT_NAME_REQUEST = 'EDIT_NAME_REQUEST';
export const EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS';
export const EDIT_NAME_FAILURE = 'EDIT_NAME_FAILURE';
export const CHANGE_NAME = 'CHANGE_NAME';

export function changeName (value, category) {
  return {
    type: CHANGE_NAME,
    value,
    category
  };
}

export function editName (token, user_id, firstname, surname) {
  return (dispatch) => {
    dispatch(editNameRequest());
    fetch(`http://localhost:3000/users/${user_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ firstname, surname })
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

export function editNameRequest () {
  return {
    type: EDIT_NAME_REQUEST
  };
}

export function editNameSuccess (data) {
  return {
    type: EDIT_NAME_SUCCESS,
    data
  };
}

export function editNameFailure (error) {
  return {
    type: EDIT_NAME_FAILURE,
    error
  };
}
