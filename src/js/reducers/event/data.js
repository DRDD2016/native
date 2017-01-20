import update from 'immutability-helper';
import * as actions from '../../actions/event/data';

export const initialState = {
  event_id: undefined,
  host_user_id: undefined,
  name: undefined,
  description: undefined,
  is_poll: undefined,
  _invitees: [],
  what: [],
  where: [],
  when: [],
  isFetching: false
};

export default function data (state = initialState, action) {

  switch (action.type) {

    case actions.GET_EVENT_REQUEST:
      return update(state, {
        isFetching: { $set: true }
      });

    case actions.GET_EVENT_SUCCESS:
      return Object.assign({},
        state,
        { ...action.data },
        { isFetching: false }
      );

    case actions.GET_EVENT_FAILURE:
      return update(state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
