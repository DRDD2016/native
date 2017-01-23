import update from 'immutability-helper';
import * as actions from '../actions/profile.old';
/* eslint-disable max-len */
const tempState = {
  isFetching: false,
  firstname: 'Dave',
  surname: 'Rickard',
  email: 'dave@spark.com',
  photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=39609ba001601e7ff5dd1bdede8bb0da&oe=58CEA14F',
  user_id: '2'
};

const initialState = { // eslint-disable-line no-unused-vars
  isFetching: false,
  firstname: '',
  surname: '',
  email: '',
  photo_url: '',
  user_id: '',
  error: undefined
};

export default function profile (state = tempState, action) {

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
    firstname: { $set: action.data.firstname },
    surname: { $set: action.data.surname },
    photo_url: { $set: action.data.photo_url },
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
  if (action.category === 'firstname') {
    const newState = update(state, {
      firstname: { $set: action.value }
    });
    return newState;
  }
  if (action.category === 'surname') {
    const newState = update(state, {
      surname: { $set: action.value }
    });
    return newState;
  }
}
