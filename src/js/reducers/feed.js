import update from 'immutability-helper';
import * as actions from '../actions/feed';

const initialState = {
  data: [],
  isFetching: false,
  error: undefined,
  showHosting: undefined,
  filter: false
};

export default function feed (state = initialState, action) {

  switch (action.type) {

    case actions.GET_FEED_REQUEST:
      return handleGetFeedRequest(state, action);

    case actions.GET_FEED_SUCCESS:
      return handleGetFeedSuccess(state, action);

    case actions.GET_FEED_FAILURE:
      return handleGetFeedFailure(state, action);

    case actions.APPLY_FILTER:
    case actions.CLEAR_FILTER:
      return handleFilter(state, action);

    default:
      return state;
  }
}

function handleGetFeedRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleGetFeedSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    data: { $set: action.data }
  });
  return newState;
}

function handleGetFeedFailure (state, action) {

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
