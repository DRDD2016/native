import update from 'immutability-helper';
import * as actions from '../../actions/event/poll';

const initialState = {
  finalChoices: {}, // redux form?
  isSavingVote: false
};

export default function poll (state = initialState, action) {

  switch (action.type) {

    case actions.VOTE_REQUEST:
    case actions.CONFIRM_EVENT_REQUEST:
      return update(state, {
        isSavingVote: true
      });

    case actions.VOTE_SUCCESS:
    case actions.CONFIRM_EVENT_SUCCESS:
      return update(state, {
        isSavingVote: false
      });

    case actions.VOTE_FAILURE:
    case actions.CONFIRM_EVENT_FAILURE:
      return update(state, {
        isSavingVote: false,
        error: action.error
      });

    default:
      return state;
  }
}
