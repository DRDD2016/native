import * as actions from '../../actions/event/poll';

const initialState = {
  isSavingVote: false
};

export default function poll (state = initialState, action) {

  switch (action.type) {

    case actions.VOTE_REQUEST:
    case actions.CONFIRM_EVENT_REQUEST:
      return { ...state, isSavingVote: true };

    case actions.VOTE_SUCCESS:
    case actions.CONFIRM_EVENT_SUCCESS:
      return { ...state, isSavingVote: false };

    case actions.VOTE_FAILURE:
    case actions.CONFIRM_EVENT_FAILURE:
      return { ...state, isSavingVote: false, error: action.error };

    default:
      return state;
  }
}
