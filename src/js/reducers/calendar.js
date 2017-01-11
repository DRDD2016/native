import update from 'immutability-helper';
import * as actions from '../actions/calendar';

const initialState = {
  data: [],
  isFetching: false,
  error: undefined,
  showHosting: undefined,
  filter: false
};

export default function calendar (state = initialState, action) {

  switch (action.type) {

    case actions.GET_CALENDAR_REQUEST:
      return handleCalendarRequest(state, action);

    case actions.GET_CALENDAR_SUCCESS:
      return handleCalendarSuccess(state, action);

    case actions.GET_CALENDAR_FAILURE:
      return handleCalendarFailure(state, action);

    case actions.APPLY_FILTER:
    case actions.CLEAR_FILTER:
      return handleFilter(state, action);

    default:
      return state;
  }
}

function handleCalendarRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleCalendarSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    data: { $set: action.data }
  });
  return newState;
}

function handleCalendarFailure (state, action) {

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
