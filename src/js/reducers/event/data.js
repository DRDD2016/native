import update from 'immutability-helper';
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
  invitees: [],
  rsvps: [],
  isFetching: false
};

export default function data (state = initialState, action) {

  switch (action.type) {

    case actions.GET_EVENT_REQUEST:
    case actions.PATCH_EVENT_REQUEST:
      return update(state, {
        isFetching: { $set: true }
      });

    case actions.GET_EVENT_SUCCESS:
    case actions.PATCH_EVENT_SUCCESS:
      return update(state, {
        isFetching: { $set: false }
      });

    case actions.GET_EVENT_FAILURE:
    case actions.PATCH_EVENT_FAILURE:
      return update(state, {
        isFetching: { $set: false },
        error: { $set: action.error }
      });

    default:
      return state;
  }
}
