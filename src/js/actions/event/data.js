import { NavigationActions } from '@exponent/ex-navigation';
import Router from '../../router';
import { store } from '../../init-store';

export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';
export const PATCH_EVENT_REQUEST = 'PATCH_EVENT_REQUEST';
export const PATCH_EVENT_SUCCESS = 'PATCH_EVENT_SUCCESS';
export const PATCH_EVENT_FAILURE = 'PATCH_EVENT_FAILURE';
export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

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

export const editEventRequest = () => ({
  type: EDIT_EVENT_REQUEST
});

export const editEventSuccess = data => ({
  type: EDIT_EVENT_SUCCESS,
  data
});

export const editEventFailure = error => ({
  type: EDIT_EVENT_FAILURE,
  error
});

export function getEvent (token, event_id) {
  return (dispatch) => {
    dispatch(getEventRequest());
    fetch(`http://localhost:3000/events/${event_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        console.log(data);
        dispatch(getEventSuccess(data));
      })
      .catch(err => dispatch(getEventFailure(err)));
    })
    .catch(err => dispatch(getEventFailure(err)));
  };
}

export function editEvent (token, event, event_id) {
  return (dispatch) => {
    dispatch(editEventRequest());
    fetch(`http://localhost:3000/events/${event_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        console.log(data);
        dispatch(editEventSuccess(data));
      })
      .catch(err => dispatch(editEventFailure(err)));
    })
    .catch(err => dispatch(editEventFailure(err)));
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
    fetch('http://localhost:3000/events/rsvps', {
      method: 'POST',
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
          dispatch(patchEventSuccess(data));
          dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('event')], 0));
        }
      })
      .catch(err => dispatch(patchEventFailure(err)));
    })
    .catch(err => dispatch(patchEventFailure(err)));
  };
}
