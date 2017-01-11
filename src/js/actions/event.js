/* eslint-disable */
import getUserID from '../lib/getUserID';
// import { clearCreateEvent } from './create';
// import { getPhotos, getDeletedPhotos } from './photos';

export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

export const UPDATE_POLL = 'UPDATE_POLL';

export const CONFIRM_POLL = 'CONFIRM_POLL';
export const CONFIRM_POLL_REQUEST = 'CONFIRM_POLL_REQUEST';
export const CONFIRM_POLL_SUCCESS = 'CONFIRM_POLL_SUCCESS';
export const CONFIRM_POLL_FAILURE = 'CONFIRM_POLL_FAILURE';

export const ADD_HOST_EVENT_CHOICE = 'ADD_HOST_EVENT_CHOICE';

export const CONFIRM_EVENT = 'CONFIRM_EVENT';
export const CONFIRM_EVENT_REQUEST = 'CONFIRM_EVENT_REQUEST';
export const CONFIRM_EVENT_SUCCESS = 'CONFIRM_EVENT_SUCCESS';
export const CONFIRM_EVENT_FAILURE = 'CONFIRM_EVENT_FAILURE';

export const UPDATE_RSVP = 'UPDATE_RSVP';
export const UPDATE_RSVP_REQUEST = 'UPDATE_RSVP_REQUEST';
export const UPDATE_RSVP_SUCCESS = 'UPDATE_RSVP_SUCCESS';
export const UPDATE_RSVP_FAILURE = 'UPDATE_RSVP_FAILURE';

export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const SAVE_EDITED_EVENT = 'SAVE_EDITED_EVENT';
export const SAVE_EDITED_EVENT_REQUEST = 'SAVE_EDITED_EVENT_REQUEST';
export const SAVE_EDITED_EVENT_SUCCESS = 'SAVE_EDITED_EVENT_SUCCESS';
export const SAVE_EDITED_EVENT_FAILURE = 'SAVE_EDITED_EVENT_FAILURE';

export const UPDATE_FEED = 'UPDATE_FEED';
export const UPDATE_FEED_REQUEST = 'UPDATE_FEED_REQUEST';
export const UPDATE_FEED_SUCCESS = 'UPDATE_FEED_SUCCESS';
export const UPDATE_FEED_FAILURE = 'UPDATE_FEED_FAILURE';

export const RESET_EVENT_STATE = 'RESET_EVENT_STATE';


/********
GET EVENT ACTIONS
********/

export function getEvent (eventID) { //eslint-disable-line
  return (dispatch) => {
    dispatch(getEventRequest());

    // axios.get(`/get-event?eventID=${eventID}&userID=${getUserID()}`)
    //   .then((response) => {
    //     dispatch(getEventSuccess(response.data));
    //     dispatch(getPhotos(response.data.photos));
    //     dispatch(getDeletedPhotos(response.data.deletedPhotos));
    //   })
    //   .catch((error) => {
    //     dispatch(getEventFailure(error));
    //   });
  };
}

export function getEventRequest () {
  return {
    type: GET_EVENT_REQUEST,
    isFetching: true
  };
}

export function getEventSuccess (event) {
  return {
    type: GET_EVENT_SUCCESS,
    isFetching: false,
    data: event
  };
}

export function getEventFailure (error) {
  return {
    type: GET_EVENT_FAILURE,
    isFetching: false,
    error
  };
}

export function updatePoll (eventType, index) {
  return {
    type: UPDATE_POLL,
    eventType,
    index
  };
}

/********
* CONFIRM POLL ACTIONS
********/

export function confirmPoll (poll, eventID) {
  return (dispatch) => {
    const payload = {
      poll,
      eventID,
      userID: getUserID()
    };

    dispatch(confirmPollRequest());

    // axios.post('/confirm-poll', payload)
    //   .then((response) => {
    //     dispatch(confirmPollSuccess(response.data));
    //     dispatch(getEvent(eventID));
    //   })
    //   .catch((error) => {
    //     dispatch(confirmPollFailure(error));
    //   });
  };
}

export function confirmPollRequest () {
  return {
    type: CONFIRM_POLL_REQUEST,
    isFetching: true
  };
}

export function confirmPollSuccess () {
  return {
    type: CONFIRM_POLL_SUCCESS,
    isFetching: false
  };
}
export function confirmPollFailure () {
  return {
    type: CONFIRM_POLL_FAILURE,
    isFetching: false
  };
}

export function addHostEventChoice (eventType, value, index) {
  return {
    type: ADD_HOST_EVENT_CHOICE,
    eventType,
    value,
    index
  };
}

/********
* CONFIRM EVENT ACTIONS
********/

export function confirmEvent (hostEventChoices, eventID) {
  return (dispatch) => {
    const payload = {
      hostEventChoices,
      eventID
    };

    dispatch(confirmEventRequest());

    // axios.post('/confirm-event', payload)
    //   .then(() => {
    //     dispatch(confirmEventSuccess());
    //   })
    //   .catch(() => {
    //     dispatch(confirmEventFailure());
    //   });
  };
}

export function confirmEventRequest () {
  return {
    type: CONFIRM_EVENT_REQUEST,
    isFetching: true
  };
}

export function confirmEventSuccess () {
  return {
    type: CONFIRM_EVENT_SUCCESS,
    isFetching: false
  };
}
export function confirmEventFailure () {
  return {
    type: CONFIRM_EVENT_FAILURE,
    isFetching: false
  };
}

/********
UPDATE RSVP ACTIONS
********/

export function updateRSVP (RSVPStatus, eventID) {
  return (dispatch) => {
    const payload = {
      userID: getUserID(),
      eventID,
      RSVPStatus
    };

    dispatch(updateRSVPRequest());

    // axios.post('/update-rsvp', payload)
    //   .then((response) => {
    //     dispatch(updateRSVPSuccess(response.data));
    //   })
    //   .catch((error) => {
    //     dispatch(updateRSVPFailure(error));
    //   });
  };
}

export function updateRSVPRequest () {
  return {
    type: UPDATE_RSVP_REQUEST,
    isFetching: true
  };
}

export function updateRSVPSuccess (RSVPs) {
  return {
    type: UPDATE_RSVP_SUCCESS,
    isFetching: false,
    data: RSVPs
  };
}

export function updateRSVPFailure (error) {
  return {
    type: UPDATE_RSVP_FAILURE,
    isFetching: false,
    error
  };
}


/********
DELETE EVENT ACTIONS
********/


export function deleteEvent (eventID) {
  return (dispatch) => {
    dispatch(deleteEventRequest());

    // axios.get(`/delete-event?eventID=${eventID}`)
    //   .then((response) => {
    //     dispatch(deleteEventSuccess(response.data));
    //   })
    //   .catch((error) => {
    //     dispatch(deleteEventFailure(error));
    //   });
  };
}

export function deleteEventRequest () {
  return {
    type: DELETE_EVENT_REQUEST,
    isFetching: true
  };
}

export function deleteEventSuccess () {
  return {
    type: DELETE_EVENT_SUCCESS,
    isFetching: false
  };
}

export function deleteEventFailure (error) {
  return {
    type: DELETE_EVENT_FAILURE,
    isFetching: false,
    error
  };
}

/********
* SAVE_EDITED_EVENT ACTIONS
********/

export function saveEditedEvent (eventName, eventDescription, eventNote, eventWhat, eventWhere, eventWhen, eventID) { //eslint-disable-line
  return (dispatch) => {
    const payload = {
      eventID,
      eventName,
      eventDescription,
      eventNote,
      eventWhat,
      eventWhere,
      eventWhen,
      userID: getUserID()
    };

    dispatch(saveEditedEventRequest());

    // axios.post('/edit-event', payload)
    //   .then(() => {
    //     dispatch(saveEditedEventSuccess());
    //     dispatch(clearCreateEvent());
    //   })
    //   .catch((error) => {
    //     dispatch(saveEditedEventFailure(error));
    //   });
  };
}

export function saveEditedEventRequest () {
  return {
    type: SAVE_EDITED_EVENT_REQUEST,
    isFetching: true
  };
}

export function saveEditedEventSuccess () {
  return {
    type: SAVE_EDITED_EVENT_SUCCESS,
    isFetching: false
  };
}

export function saveEditedEventFailure (error) {
  return {
    type: SAVE_EDITED_EVENT_FAILURE,
    isFetching: false,
    error
  };
}

/********
* UPDATE FEEDS ACTIONS
********/
export function updateFeedItem (index) {
  return (dispatch) => {
    dispatch(updateFeedItemRequest());

    // axios.get(`/update-feedItem?index=${index}&userID=${getUserID()}`)
    //   .then(() => {
    //     dispatch(updateFeedItemSuccess());
    //   })
    //   .catch((error) => {
    //     dispatch(updateFeedItemFailure(error));
    //   });
  };
}

export function updateFeedItemRequest () {
  return {
    type: UPDATE_FEED_REQUEST,
    updateFeedItem: true
  };
}

export function updateFeedItemSuccess () {
  return {
    type: UPDATE_FEED_SUCCESS,
    updateFeedItem: false
  };
}

export function updateFeedItemFailure (error) {
  return {
    type: UPDATE_FEED_FAILURE,
    updateFeedItem: false,
    error
  };
}

/********
* RESET_EVENT_STATE ACTION
********/

export function resetEventState () {
  return {
    type: RESET_EVENT_STATE
  };
}
