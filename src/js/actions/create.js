import Config from 'react-native-config';
import { NavigationActions } from 'react-navigation';
import { getCalendar } from './calendar';
import { composeLinkToShare } from '../lib/branchLink';
import { store } from '../init-store';

export const SET_DETAILS = 'SET_DETAILS';
export const SET_WHAT = 'SET_WHAT';
export const SET_WHERE = 'SET_WHERE';
export const SET_WHEN = 'SET_WHEN';

export const SAVE_EVENT_REQUEST = 'SAVE_EVENT_REQUEST';
export const SAVE_EVENT_SUCCESS = 'SAVE_EVENT_SUCCESS';
export const SAVE_EVENT_FAILURE = 'SAVE_EVENT_FAILURE';
export const SAVE_EVENT_DONE = 'SAVE_EVENT_DONE';

export const SHARE_INVITE_REQUEST = 'SHARE_INVITE_REQUEST';
export const SHARE_INVITE_SUCCESS = 'SHARE_INVITE_SUCCESS';
export const SHARE_INVITE_FAILURE = 'SHARE_INVITE_FAILURE';

export const HYDRATE_CREATE_EVENT = 'HYDRATE_CREATE_EVENT';
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

export function saveEvent (token, eventData, navigation) { //eslint-disable-line
  return function (dispatch) {
    dispatch(saveEventRequest());
    fetch(`${Config.URI}/events`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event: eventData })
    })
    .then((response) => {
      response.json()
      .then((data) => {
        if (data.error) {
          dispatch(saveEventFailure(data.error));
        } else {

          dispatch(saveEventSuccess());
          if (eventData.is_poll === false) {
            dispatch(getCalendar(token));
          }
          dispatch(shareInviteRequest());
          console.log('create action - share request');
          composeLinkToShare(store.getState().user, eventData, data.code);
          dispatch(clearCreateEvent());

          console.log('create action - Navigate to Feed');

          const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'tabsMain' })
            ]
          });

          navigation.dispatch(resetAction);

          console.log('create action - Save Event Done - update Feed');
          dispatch(saveEventDone()); // forces Feed to update after navigation.

        }
      });
    })
    .catch((error) => {
      dispatch(saveEventFailure(error.message));
    });
  };
}

export function shareInviteRequest () {
  return {
    type: SHARE_INVITE_REQUEST
  };
}

export function shareInviteSuccess () {
  return {
    type: SHARE_INVITE_SUCCESS
  };
}

export function shareInviteFailure (error) {
  return {
    type: SHARE_INVITE_FAILURE,
    error
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

export function saveEventDone () {
  return {
    type: SAVE_EVENT_DONE
  };
}

export function hydrateCreateEvent (data) {
  return {
    type: HYDRATE_CREATE_EVENT,
    data
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
