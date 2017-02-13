import update from 'immutability-helper';
import * as actions from '../actions/profile.old';

const initialState = {
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
