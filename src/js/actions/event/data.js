import Config from 'react-native-config';
import { pushTo, resetStackTo } from '../../lib/navigate';

export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';
export const SUBMIT_CODE_REQUEST = 'SUBMIT_CODE_REQUEST';
export const SUBMIT_CODE_SUCCESS = 'SUBMIT_CODE_SUCCESS';
export const SUBMIT_CODE_FAILURE = 'SUBMIT_CODE_FAILURE';
export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';
export const UPDATE_RSVP_REQUEST = 'UPDATE_RSVP_REQUEST';
export const UPDATE_RSVP_SUCCESS = 'UPDATE_RSVP_SUCCESS';
export const UPDATE_RSVP_FAILURE = 'UPDATE_RSVP_FAILURE';

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

export const submitCodeRequest = () => ({
  type: SUBMIT_CODE_REQUEST
});

export const submitCodeSuccess = data => ({
  type: SUBMIT_CODE_SUCCESS,
  data
});

export const submitCodeFailure = error => ({
  type: SUBMIT_CODE_FAILURE,
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

export const updateRsvpRequest = () => ({
  type: UPDATE_RSVP_REQUEST
});

export const updateRsvpSuccess = data => ({
  type: UPDATE_RSVP_SUCCESS,
  data
});

export const updateRsvpFailure = error => ({
  type: UPDATE_RSVP_FAILURE,
  error
});

export function getEvent (token, event_id) {
  return (dispatch) => {
    dispatch(getEventRequest());
    fetch(`${Config.URI}/events/${event_id}`, {
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
        dispatch(getEventSuccess(data));
        pushTo('event');
      })
      .catch(err => dispatch(getEventFailure(err)));
    })
    .catch(err => dispatch(getEventFailure(err)));
  };
}

export function editEvent (token, event, event_id) {

  return (dispatch) => {
    dispatch(editEventRequest());
    fetch(`${Config.URI}/events/${event_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token
      },
      body: JSON.stringify({ event })
    })
    .then((res) => {
      res.json()
      .then((data) => {
        dispatch(editEventSuccess(data));
      })
      .catch(err => dispatch(editEventFailure(err)));
    })
    .catch(err => dispatch(editEventFailure(err)));
  };
}


export function submitCode (token, code) {
  return (dispatch) => {
    dispatch(submitCodeRequest());
    fetch(`${Config.URI}/events/rsvps`, {
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
          dispatch(submitCodeFailure(data.error));
        } else {
          // redirect
          dispatch(submitCodeSuccess(data));
          resetStackTo('event');
        }
      })
      .catch(err => dispatch(submitCodeFailure(err)));
    })
    .catch(err => dispatch(submitCodeFailure(err)));
  };
}

export function updateRsvp (token, event_id, status) {
  return (dispatch) => {
    dispatch(updateRsvpRequest());
    fetch(`${Config.URI}/events/${event_id}/rsvps`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ status })
    })
    .then((res) => {
      res.json()
      .then((data) => {
        if (data.error) {
          dispatch(updateRsvpFailure(data.error));
        } else {
          console.log(data);
          dispatch(updateRsvpSuccess(data));
        }
      })
      .catch(err => dispatch(updateRsvpFailure(err)));
    })
    .catch(err => dispatch(updateRsvpFailure(err)));
  };
}
