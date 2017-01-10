// import getUserID from '../lib/getUserID';

export const SET_DETAILS = 'SET_DETAILS';
export const SET_WHAT = 'SET_WHAT';
export const SET_WHERE = 'SET_WHERE';
export const SET_WHEN = 'SET_WHEN';

export const SAVE_EVENT = 'SAVE_EVENT';
export const SAVE_EVENT_REQUEST = 'SAVE_EVENT_REQUEST';
export const SAVE_EVENT_SUCCESS = 'SAVE_EVENT_SUCCESS';
export const SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';
export const CLEAR_CREATE_EVENT = 'CLEAR_CREATE_EVENT';

export const ADD_INPUT = 'ADD_INPUT';
export const REMOVE_INPUT = 'REMOVE_INPUT';

export const HYDRATE_CREATE_EVENT = 'HYDRATE_CREATE_EVENT';

/********
SET EVENT ACTIONS
********/

export function setDetails (data, inputType) {
  return {
    type: SET_DETAILS,
    data,
    inputType
  };
}

export function setWhat (data, inputKey) {
  return {
    type: SET_WHAT,
    data,
    inputKey
  };
}

export function setWhere (data, inputKey) {
  return {
    type: SET_WHERE,
    data,
    inputKey
  };
}

export function setWhen (data, inputKey, format) {
  return {
    type: SET_WHEN,
    data,
    inputKey,
    format
  };
}

/********
* SAVE EVENT ACTIONS
********/

export function saveEvent (eventData) { //eslint-disable-line
  return function (dispatch) {
    dispatch(saveEventRequest());

    // return axios.post('http://localhost:3000/events', eventData)
    //   .then(() => {
    //     dispatch(saveEventSuccess());
    //     dispatch(clearCreateEvent());
    //   })
    //   .catch((error) => {
    //     dispatch(saveEventFailure(error));
    //   });
  };
}

export function saveEventRequest () {
  return {
    type: SAVE_EVENT_REQUEST,
    isFetching: true
  };
}

export function saveEventSuccess () {
  return {
    type: SAVE_EVENT_SUCCESS,
    isFetching: false,
    didSave: true
  };
}

export function saveEventFailure (error) {
  return {
    type: SAVE_EVENT_FAILURE,
    isFetching: false,
    error,
    didSave: false
  };
}

export function clearCreateEvent () {
  return {
    type: CLEAR_CREATE_EVENT
  };
}

/********
* INPUT ACTIONS
********/

export function addInput (nextInputKey, eventType) {
  return {
    type: ADD_INPUT,
    nextInputKey,
    eventType
  };
}

export function removeInput (inputKey, eventType) {
  return {
    type: REMOVE_INPUT,
    inputKey,
    eventType
  };
}

/********
* HYDRATE EDIT EVENT ACTIONS
********/

export function hydrateCreateEvent (event) {
  return {
    type: HYDRATE_CREATE_EVENT,
    data: event
  };
}
