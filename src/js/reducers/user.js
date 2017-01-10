import update from 'immutability-helper';
import { GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  CHANGE_NAME,
  EDIT_NAME_REQUEST,
  EDIT_NAME_SUCCESS,
  EDIT_NAME_FAILURE
} from '../actions/user';


const initialState = {
  isFetching: false,
  firstName: '',
  lastName: '',
  photoURL: '',
  id: '',
  error: undefined
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
    case EDIT_NAME_REQUEST:
    case EDIT_NAME_SUCCESS:
      return handleRequest(state, action);
    case GET_USER_SUCCESS:
      return handleGetUserSuccess(state, action);
    case GET_USER_FAILURE:
    case EDIT_NAME_FAILURE:
      return handleFailure(state, action);
    case CHANGE_NAME:
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

function handleGetUserSuccess (state, action) {

  return update(state, {
    isFetching: { $set: false },
    firstName: { $set: action.data.firstName },
    lastName: { $set: action.data.lastName },
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
  if (action.inputType === 'firstName') {
    const newState = update(state, {
      firstName: { $set: action.value }
    });
    return newState;
  }
  if (action.inputType === 'lastName') {
    const newState = update(state, {
      lastName: { $set: action.value }
    });
    return newState;
  }
}
