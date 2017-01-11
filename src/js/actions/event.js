/* eslint-disable */
import getUserID from '../lib/getUserID';
// import { clearCreateEvent } from './create';
// import { getPhotos, getDeletedPhotos } from './photos';

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


let user_id;
/********
UPDATE RSVP ACTIONS
********/

export function updateRSVP (RSVPStatus, event_id) {
  return (dispatch) => {
    const payload = {
      user_id,
      event_id,
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


export function deleteEvent (event_id) {
  return (dispatch) => {
    dispatch(deleteEventRequest());

    // axios.get(`/delete-event?event_id=${event_id}`)
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

export function saveEditedEvent (eventName, eventDescription, eventNote, eventWhat, eventWhere, eventWhen, event_id) { //eslint-disable-line
  return (dispatch) => {
    const payload = {
      event_id,
      eventName,
      eventDescription,
      eventNote,
      eventWhat,
      eventWhere,
      eventWhen,
      user_id
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

    // axios.get(`/update-feedItem?index=${index}&user_id=${getUserID()}`)
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
