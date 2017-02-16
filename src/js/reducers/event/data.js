import * as actions from '../../actions/event/data';

export const initialState = {
  event_id: undefined,
  code: undefined,
  host_user_id: undefined,
  name: undefined,
  description: undefined,
  note: undefined,
  is_poll: undefined,
  vote_count: undefined,
  what: [],
  where: [],
  when: [],
  rsvps: {
    going: [],
    maybe: [],
    not_going: [],
    not_responded: []
  },
  isFetching: false
};

export default function data (state = initialState, action) {

  switch (action.type) {

    case actions.GET_EVENT_REQUEST:
    case actions.EDIT_EVENT_REQUEST:
    case actions.SUBMIT_CODE_REQUEST:
      return { ...state, isFetching: true };

    case actions.GET_EVENT_SUCCESS:
    case actions.EDIT_EVENT_SUCCESS:
    case actions.SUBMIT_CODE_SUCCESS:
      return { ...state, ...action.data, isFetching: false };

    case actions.GET_EVENT_FAILURE:
    case actions.EDIT_EVENT_FAILURE:
    case actions.SUBMIT_CODE_FAILURE:
      return { ...state, ...action.error, isFetching: false };

    default:
      return state;
  }
}
