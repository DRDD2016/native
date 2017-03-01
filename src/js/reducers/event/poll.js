import * as actions from '../../actions/event/poll';

const initialState = {
  isSavingVote: false,
  voteSaved: false,
  voteCount: undefined,
  finalChoices: undefined,
  error: undefined
};

export default function poll (state = initialState, action) {

  switch (action.type) {

    case actions.GET_VOTES_REQUEST:
    case actions.POST_VOTE_REQUEST:
    case actions.FINALISE_EVENT_REQUEST:
      return { ...state, isSavingVote: true };

    case actions.GET_VOTES_SUCCESS:
      return { ...state, isSavingVote: false, voteCount: action.data };

    case actions.POST_VOTE_SUCCESS:
      return { ...state, isSavingVote: false, voteSaved: true };

    case actions.FINALISE_EVENT_SUCCESS:
      return { ...state, isSavingVote: false, finalChoices: action.data };

    case actions.GET_VOTES_FAILURE:
    case actions.POST_VOTE_FAILURE:
    case actions.FINALISE_EVENT_FAILURE:
      return { ...state, isSavingVote: false, error: action.error };

    case actions.CLEAR_POLL_STATE:
      return initialState;

    default:
      return state;
  }
}
