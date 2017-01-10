import update from 'immutability-helper';
import { GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  APPLY_FILTER,
  CLEAR_FILTER
} from '../actions/notifications';

const initialState = {
  data: [],
  isFetching: false,
  error: undefined,
  showHosting: undefined,
  filter: false
};

export default function notifications (state = initialState, action) {

  switch (action.type) {

    case GET_NOTIFICATIONS_REQUEST:
      return handleGetNotificationsRequest(state, action);

    case GET_NOTIFICATIONS_SUCCESS:
      return handleGetNotificationsSuccess(state, action);

    case GET_NOTIFICATIONS_FAILURE:
      return handleGetNotificationsFailure(state, action);

    case APPLY_FILTER:
    case CLEAR_FILTER:
      return handleFilter(state, action);

    default:
      return state;
  }
}

function handleGetNotificationsRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleGetNotificationsSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    data: { $set: action.data }
  });
  return newState;
}

function handleGetNotificationsFailure (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    error: { $set: action.error }
  });
  return newState;
}


function handleFilter (state, action) {

  const newState = update(state, {
    filter: { $set: action.filter },
    showHosting: { $set: action.showHosting }
  });
  return newState;
}
