import update from 'immutability-helper';
import * as actions from '../actions/profile.old';
/* eslint-disable max-len */
// const tempState = {
//   isFetching: false,
//   firstname: 'Dave',
//   surname: 'Rickard',
//   email: 'dave@spark.com',
//   photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=39609ba001601e7ff5dd1bdede8bb0da&oe=58CEA14F',
//   user_id: '2'
// };

const initialState = { // eslint-disable-line no-unused-vars
  isFetching: false,
  firstname: '',
  surname: '',
  email: '',
  photo_url: '',
  user_id: '',
  error: undefined
};

export default function profile (state = initialState, action) {

  switch (action.type) {
    case actions.EDIT_NAME_REQUEST:
    case actions.EDIT_NAME_SUCCESS:
      return {
        ...state,
        isFetching: true
      };

    case actions.EDIT_NAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case actions.CHANGE_NAME:
      return handleChangeName(state, action);

    default:
      return state;
  }
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
