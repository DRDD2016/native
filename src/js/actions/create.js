export const SET_DETAILS = 'SET_DETAILS';
export const SET_WHAT = 'SET_WHAT';
export const SET_WHERE = 'SET_WHERE';
export const SET_WHEN = 'SET_WHEN';

export const SAVE_EVENT_REQUEST = 'SAVE_EVENT_REQUEST';
export const SAVE_EVENT_SUCCESS = 'SAVE_EVENT_SUCCESS';
export const SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';
export const CLEAR_CREATE_EVENT = 'CLEAR_CREATE_EVENT';

export const ADD_INPUT = 'ADD_INPUT';
export const REMOVE_INPUT = 'REMOVE_INPUT';

/********
SET EVENT ACTIONS
********/

export function setDetails (data, field) {
  return {
    type: SET_DETAILS,
    data,
    field
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

    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then((response) => {
      response.json()
      .then((data) => {
        console.log('CODE', data);
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
  };
}

export function saveEventRequest () {
  return {
    type: SAVE_EVENT_REQUEST
  };
}

export function saveEventSuccess () {
  return {
    type: SAVE_EVENT_SUCCESS
  };
}

export function saveEventFailure (error) {
  return {
    type: SAVE_EVENT_FAILURE,
    error
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

export function addInput (nextInputKey, category) {
  return {
    type: ADD_INPUT,
    nextInputKey,
    category
  };
}

export function removeInput (inputKey, category) {
  return {
    type: REMOVE_INPUT,
    inputKey,
    category
  };
}
