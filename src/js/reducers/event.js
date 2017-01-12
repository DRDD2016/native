import update from 'immutability-helper';
import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAILURE, UPDATE_POLL,
         VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE, ADD_HOST_EVENT_CHOICE,
         CONFIRM_EVENT_REQUEST, CONFIRM_EVENT_SUCCESS, CONFIRM_EVENT_FAILURE,
         UPDATE_RSVP_REQUEST, UPDATE_RSVP_SUCCESS, UPDATE_RSVP_FAILURE,
         DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
         SAVE_EDITED_EVENT_REQUEST, SAVE_EDITED_EVENT_SUCCESS, SAVE_EDITED_EVENT_FAILURE,
         UPDATE_FEED_REQUEST, UPDATE_FEED_SUCCESS, UPDATE_FEED_FAILURE,
         RESET_EVENT_STATE } from '../actions/event';

export const initialState = {
  event_id: undefined,
  host_user_id: undefined,
  name: undefined,
  description: undefined,
  is_poll: undefined,
  _invitees: [],
  _what: [],
  _where: [],
  _when: [],
  poll: {}
};

export default function event (state = initialState, action) {

  switch (action.type) {

    case GET_EVENT_REQUEST:
    case VOTE_REQUEST:
    case CONFIRM_EVENT_REQUEST:
    case DELETE_EVENT_REQUEST:
    case SAVE_EDITED_EVENT_REQUEST:
    case UPDATE_RSVP_REQUEST:
      return handleRequest(state, action);

    case GET_EVENT_SUCCESS:
      return handleGetEventSuccess(state, action);

    case VOTE_SUCCESS:
    case CONFIRM_EVENT_SUCCESS:
    case DELETE_EVENT_SUCCESS:
    case SAVE_EDITED_EVENT_SUCCESS:
      return handleRequest(state, action);

    case UPDATE_RSVP_SUCCESS:
      return handleRSVPSuccess(state, action);

    case GET_EVENT_FAILURE:
    case VOTE_FAILURE:
    case CONFIRM_EVENT_FAILURE:
    case DELETE_EVENT_FAILURE:
    case SAVE_EDITED_EVENT_FAILURE:
    case UPDATE_RSVP_FAILURE:
      return handleFailure(state, action);

    case UPDATE_FEED_REQUEST:
    case UPDATE_FEED_SUCCESS:
      return handleUpdateFeedItem(state, action);
    case UPDATE_FEED_FAILURE:
      return handleUpdateFeedItemFailure(state, action);

    case UPDATE_POLL:
      return updatePoll(state, action);

    case ADD_HOST_EVENT_CHOICE:
      return addHostEventChoice(state, action);

    case RESET_EVENT_STATE:
      return initialState;

    default:
      return state;
  }
}

function handleRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleFailure (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    error: { $set: action.error }
  });
  return newState;
}

function handleRSVPSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    rsvps: { $set: action.data }
  });
  return newState;
}

function handleGetEventSuccess (state, action) {
  let hostEventChoices;

  if (action.data.tally) {
    hostEventChoices = {};
    Object.keys(action.data.tally).forEach((eventType) => {
      hostEventChoices[eventType] = '';
    });
  }
  const newState = update(state, {

    isFetching: { $set: action.isFetching },
    data: { $set: action.data.event },
    tally: { $set: action.data.tally },
    poll: { $set: action.data.poll },
    hostEventChoices: { $set: hostEventChoices },
    rsvps: { $set: action.data.rsvps },
    invitees: { $set: action.data.invitees },
    hasVoted: { $set: action.data.hasVoted }
  });
  return newState;
}

function updatePoll (state, action) {

  const newValue = !state.poll[action.eventType][action.index];
  const newState = update(state, {
    poll: { [action.eventType]: { $splice: [[action.index, 1, newValue]] } }
  });
  return newState;
}

function addHostEventChoice (state, action) {

  const newState = update(state, {
    hostEventChoices: { [action.eventType]: { $set: action.index } }
  });
  return newState;
}

function handleUpdateFeedItem (state, action) {

  const newState = update(state, {
    updateFeedItem: { $set: action.updateFeedItem }
  });
  return newState;
}

function handleUpdateFeedItemFailure (state, action) {

  const newState = update(state, {
    updateFeedItem: { $set: action.updateFeedItem },
    error: { $set: action.error }
  });
  return newState;
}
