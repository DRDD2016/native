import * as actions from '../../actions/event/data';

export const initialState = {
  event_id: undefined,
  code: undefined,
  host_user_id: undefined,
  name: undefined,
  description: undefined,
  note: undefined,
  is_poll: undefined,
  what: [],
  where: [],
  when: [],
  rsvps: {
    going: [],
    maybe: [],
    not_going: [],
    not_responded: []
  },
  isFetching: false,
  error: undefined
};

export default function data (state = initialState, action) {

  switch (action.type) {

    case actions.GET_EVENT_REQUEST:
    case actions.EDIT_EVENT_REQUEST:
    case actions.SUBMIT_CODE_REQUEST:
    case actions.UPDATE_RSVP_REQUEST:
    case actions.DELETE_EVENT_REQUEST:
      return { ...state, isFetching: true };

    case actions.GET_EVENT_SUCCESS:
    case actions.EDIT_EVENT_SUCCESS:
    case actions.SUBMIT_CODE_SUCCESS:
    case actions.UPDATE_RSVP_SUCCESS:
      return { ...state, ...action.data, isFetching: false };

    case actions.DELETE_EVENT_SUCCESS:
      return { ...state, isFetching: false };

    case actions.GET_EVENT_FAILURE:
    case actions.EDIT_EVENT_FAILURE:
    case actions.SUBMIT_CODE_FAILURE:
    case actions.UPDATE_RSVP_FAILURE:
    case actions.DELETE_EVENT_FAILURE:
      return { ...state, error: action.error, isFetching: false };

    default:
      return state;
  }
}
