import Config from 'react-native-config';
import { NavigationActions } from '@exponent/ex-navigation';
import Router from '../../router';
import { store } from '../../init-store';
import { getCalendar } from '../calendar';

export const GET_VOTES_REQUEST = 'GET_VOTES_REQUEST';
export const GET_VOTES_SUCCESS = 'GET_VOTES_SUCCESS';
export const GET_VOTES_FAILURE = 'GET_VOTES_FAILURE';

export const POST_VOTE_REQUEST = 'POST_VOTE_REQUEST';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_VOTE_FAILURE = 'POST_VOTE_FAILURE';

export const FINALISE_EVENT_REQUEST = 'FINALISE_EVENT_REQUEST';
export const FINALISE_EVENT_SUCCESS = 'FINALISE_EVENT_SUCCESS';
export const FINALISE_EVENT_FAILURE = 'FINALISE_EVENT_FAILURE';

/********
* GET VOTES ACTIONS
********/

export function getVotes (token, event_id) {
  return (dispatch) => {
    dispatch(getVotesRequest());

    fetch(`${Config.URI}/votes/${event_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        if (res.status === 200) {
          dispatch(getVotesSuccess(data));
        } else {
          dispatch(getVotesFailure(new Error('Something went wrong')));
        }
      });
    })
    .catch((err) => {
      dispatch(getVotesFailure(err));
    });
  };
}
export function getVotesRequest () {
  return {
    type: GET_VOTES_REQUEST
  };
}

export function getVotesSuccess (data) {
  return {
    type: GET_VOTES_SUCCESS,
    data
  };
}
export function getVotesFailure (error) {
  return {
    type: GET_VOTES_FAILURE,
    error
  };
}
/********
* POST VOTE ACTIONS
********/

export function postVote (token, vote, event_id) { // eslint-disable-line
  return (dispatch) => {
    dispatch(postVoteRequest());

    fetch(`${Config.URI}/votes/${event_id}`, {
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
* FINALISE EVENT ACTIONS
********/

export function finaliseEvent (token, hostEventChoices, event_id) { // eslint-disable-line
  return (dispatch) => {
    dispatch(finaliseEventRequest());
    fetch(`${Config.URI}/events/${event_id}`, {
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
        dispatch(getCalendar(token));
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
