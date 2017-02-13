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
