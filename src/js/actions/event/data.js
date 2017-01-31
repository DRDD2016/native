import { NavigationActions } from '@exponent/ex-navigation';
import Router from '../../router';
import { store } from '../../init-store';

export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';
export const PATCH_EVENT_REQUEST = 'PATCH_EVENT_REQUEST';
export const PATCH_EVENT_SUCCESS = 'PATCH_EVENT_SUCCESS';
export const PATCH_EVENT_FAILURE = 'PATCH_EVENT_FAILURE';

const event1 = {
  event_id: 1,
  code: 'abcd',
  host_user_id: 1,
  name: 'Lounge party',
  description: 'Celebrating life',
  is_poll: true,
  what: ['dancing', 'singing'],
  where: ['Forest', 'London'],
  when: [{ date: '01-01-2017', time: '12:00:00' }, { date: '01-08-2017', time: '12:00:00' }],
  invitees: [2],
  vote_count: {
    what: [2, 2],
    where: [3, 0],
    when: [1, 2]
  },
  rsvps: { going: [], not_going: [], maybe: [] }
};

export const getEventRequest = () => ({
  type: GET_EVENT_REQUEST
});

export const getEventSuccess = data => ({
  type: GET_EVENT_SUCCESS,
  data
});

export const getEventFailure = error => ({
  type: GET_EVENT_FAILURE,
  error
});

export function getEvent (event_id) { //eslint-disable-line
  return (dispatch) => {
    dispatch(getEventRequest());
    dispatch(getEventSuccess(event1));
  };
}

export const patchEventRequest = () => ({
  type: PATCH_EVENT_REQUEST
});

export const patchEventSuccess = data => ({
  type: PATCH_EVENT_SUCCESS,
  data
});

export const patchEventFailure = error => ({
  type: PATCH_EVENT_FAILURE,
  error
});

export function submitCode (token, code) { //eslint-disable-line
  return (dispatch) => {
    dispatch(patchEventRequest());
    fetch('http://localhost:3000/events/invitees', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ code })
    })
    .then((res) => {
      res.json()
      .then((data) => {
        if (data.error) {
          dispatch(patchEventFailure(data.error));
        } else {
          // redirect
          const navigatorUID = store.getState().navigation.currentNavigatorUID;
          dispatch(patchEventSuccess(JSON.parse(data)));
          dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('event')], 0));
        }
      })
      .catch(err => console.error(err));
    })
    .catch(err => dispatch(patchEventFailure(err)));
  };
}
