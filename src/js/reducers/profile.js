import update from 'immutability-helper';
import * as actions from '../actions/profile';

const initialState = {
  isFetching: false,
  firstname: '',
  surname: '',
  email: '',
  photoURL: '',
  id: '',
  error: undefined
};

export default function profile (state = initialState, action) {

  switch (action.type) {

    case actions.GET_PROFILE_REQUEST:
    case actions.EDIT_NAME_REQUEST:
    case actions.EDIT_NAME_SUCCESS:
      return handleRequest(state, action);

    case actions.GET_PROFILE_SUCCESS:
      return handleGetProfileSuccess(state, action);

    case actions.GET_PROFILE_FAILURE:
    case actions.EDIT_NAME_FAILURE:
      return handleFailure(state, action);

    case actions.CHANGE_NAME:
      return handleChangeName(state, action);

    default:
      return state;
  }
}

function handleRequest (state) {

  return update(state, {
    isFetching: { $set: true }
  });
}

function handleGetProfileSuccess (state, action) {

  return update(state, {
    isFetching: { $set: false },
    firstName: { $set: action.data.firstname },
    lastName: { $set: action.data.surname },
    photoURL: { $set: action.data.photoURL },
    id: { $set: action.data.id }
  });
}

function handleFailure (state, action) {

  return update(state, {
    isFetching: { $set: false },
    error: { $set: action.error }
  });
}

function handleChangeName (state, action) {
  if (action.inputType === 'firstname') {
    const newState = update(state, {
      firstName: { $set: action.value }
    });
    return newState;
  }
  if (action.inputType === 'surname') {
    const newState = update(state, {
      lastName: { $set: action.value }
    });
    return newState;
  }
}
