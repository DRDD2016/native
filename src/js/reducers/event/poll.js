import * as actions from '../../actions/event/poll';

const initialState = {
  isSavingVote: false,
  voteSaved: false
};

export default function poll (state = initialState, action) {

  switch (action.type) {

    case actions.POST_VOTE_REQUEST:
    case actions.CONFIRM_EVENT_REQUEST:
      return { ...state, isSavingVote: true };

    case actions.POST_VOTE_SUCCESS:
      return { ...state, isSavingVote: false, voteSaved: true };

    case actions.CONFIRM_EVENT_SUCCESS:
      return { ...state, isSavingVote: false };

    case actions.POST_VOTE_FAILURE:
    case actions.CONFIRM_EVENT_FAILURE:
      return { ...state, isSavingVote: false, error: action.error };

    default:
      return state;
  }
}
