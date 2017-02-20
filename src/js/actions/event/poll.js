import { NavigationActions } from '@exponent/ex-navigation';
import Router from '../../router';
import { store } from '../../init-store';

export const POST_VOTE_REQUEST = 'POST_VOTE_REQUEST';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_VOTE_FAILURE = 'POST_VOTE_FAILURE';

export const FINALISE_EVENT_REQUEST = 'FINALISE_EVENT_REQUEST';
export const FINALISE_EVENT_SUCCESS = 'FINALISE_EVENT_SUCCESS';
export const FINALISE_EVENT_FAILURE = 'FINALISE_EVENT_FAILURE';


/********
* VOTE ACTIONS
********/

export function postVote (token, vote, event_id) { // eslint-disable-line
  return (dispatch) => {
    dispatch(postVoteRequest());

    fetch(`http://localhost:3000/votes/${event_id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ vote })
    })
    .then((res) => {
      if (res.status === 201) {
        dispatch(postVoteSuccess());
        setTimeout(() => {
          const navigatorUID = store.getState().navigation.currentNavigatorUID;
          dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('feed')], 0));
        }, 3000);
      } else {
        dispatch(postVoteFailure(new Error('Something went wrong')));
      }
    })
    .catch((err) => {
      dispatch(postVoteFailure(err));
    });
  };
}

export function postVoteRequest () {
  return {
    type: POST_VOTE_REQUEST
  };
}

export function postVoteSuccess () {
  return {
    type: POST_VOTE_SUCCESS
  };
}
export function postVoteFailure (error) {
  return {
    type: POST_VOTE_FAILURE,
    error
  };
}


/********
* CONFIRM EVENT ACTIONS
********/

export function finaliseEvent (token, hostEventChoices, event_id) { // eslint-disable-line
  return (dispatch) => {
    dispatch(finaliseEventRequest());
    fetch(`http://localhost:3000/events/${event_id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ hostEventChoices })
    })
    .then((res) => {
      res.json()
      .then((data) => {
        dispatch(finaliseEventSuccess(data));
      })
      .catch(err => dispatch(finaliseEventFailure(err)));
    })
    .catch(err => dispatch(finaliseEventFailure(err)));
  };
}

export function finaliseEventRequest () {
  return {
    type: FINALISE_EVENT_REQUEST
  };
}

export function finaliseEventSuccess (data) {
  return {
    type: FINALISE_EVENT_SUCCESS,
    data
  };
}
export function finaliseEventFailure (error) {
  return {
    type: FINALISE_EVENT_FAILURE,
    error
  };
}
