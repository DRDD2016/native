import Config from 'react-native-config';
import { getVotes, clearPollState } from './poll';
import { hydrateCreateEvent, clearCreateEvent } from '../create';
import { getCalendar } from '../calendar';
import { store } from '../../init-store';

export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';
export const SUBMIT_CODE_REQUEST = 'SUBMIT_CODE_REQUEST';
export const SUBMIT_CODE_SUCCESS = 'SUBMIT_CODE_SUCCESS';
export const SUBMIT_CODE_FAILURE = 'SUBMIT_CODE_FAILURE';
export const CLEAR_CODE_REQUEST = 'CLEAR_CODE_REQUEST';
export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';
export const UPDATE_RSVP_REQUEST = 'UPDATE_RSVP_REQUEST';
export const UPDATE_RSVP_SUCCESS = 'UPDATE_RSVP_SUCCESS';
export const UPDATE_RSVP_FAILURE = 'UPDATE_RSVP_FAILURE';
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

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

export const clearCodeRequest = () => ({
  type: CLEAR_CODE_REQUEST
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

export const deleteEventRequest = () => ({
  type: DELETE_EVENT_REQUEST
});

export const deleteEventSuccess = () => ({
  type: DELETE_EVENT_SUCCESS
});

export const deleteEventFailure = error => ({
  type: DELETE_EVENT_FAILURE,
  error
});

export function getEvent (token, event_id, navigation) {
  return (dispatch) => {

    dispatch(getEventRequest());

    fetch(`${Config.URI}/events/${event_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        console.log('getEvent data: ', data);
        const userIsHost = store.getState().user.user_id === data.host_user_id;
        if (data.is_poll) {
          dispatch(getVotes(token, event_id, userIsHost));
        }
        dispatch(getEventSuccess(data));
        dispatch(clearPollState());
        dispatch(getCalendar(token));
        const params = {
          userIsHost: store.getState().user.user_id === data.host_user_id,
          isPoll: data.is_poll,
          name: data.name,
          event: data,
          handleEdit: () => {
            dispatch(clearCreateEvent());

            setTimeout(() => {
              dispatch(hydrateCreateEvent(data));
            }, 200);

            navigation.navigate('Edit', params, navigation);
          },
          previousRoute: navigation.state.routeName
        };
        console.log('resetting route to event in data action creator');
        console.log('params', params);
        // new code - reset navigation
        // const resetAction = NavigationActions.reset({
        //   index: 1,
        //   actions: [
        //     NavigationActions.navigate({ routeName: 'event', params })
        //   ]
        // });
        //
        // this.props.navigation.dispatch(resetAction);

        //

        navigation.navigate('event', params);
      })
      .catch((err) => {
        dispatch(getEventFailure(err.message));
      });
    })
    .catch((err) => {
      dispatch(getEventFailure(err.message));
    });
  };
}

export function clearCode () {
  return (dispatch) => {
    dispatch(clearCodeRequest());
  };
}

export function submitCode (token, code, navigation) {
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
          const userIsHost = store.getState().user.user_id === data.host_user_id;
          if (data.is_poll) {
            dispatch(getVotes(token, data.event_id, userIsHost));
          }
          dispatch(submitCodeSuccess(data));
          dispatch(clearPollState());
          dispatch(getCalendar(token));
          const params = {
            userIsHost: store.getState().user.user_id === data.host_user_id,
            isPoll: data.is_poll,
            name: data.name,
            event: data,
            handleEdit: () => {
              dispatch(clearCreateEvent());
              setTimeout(() => {
                dispatch(hydrateCreateEvent(data));
              }, 200);
              navigation.navigate('Edit', params, navigation);
            },
            previousRoute: navigation.state.routeName
          };

          console.log('resetting route to event in submit code data action creator');
          // new code - reset navigation
          // const resetAction = NavigationActions.reset({
          //   index: 1,
          //   actions: [
          //     NavigationActions.navigate({ routeName: 'event', params })
          //   ]
          // });
          //
          // navigation.dispatch(resetAction);

          //

          navigation.navigate('event', params);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(submitCodeFailure('Something went wrong. Try again!'));
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(submitCodeFailure('Something went wrong. Try again!'));
    });
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
        dispatch(clearCreateEvent());
        dispatch(getCalendar(token));
      })
      .catch(err => dispatch(editEventFailure(err.message)));
    })
    .catch(err => dispatch(editEventFailure(err.message)));
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
          dispatch(updateRsvpSuccess(data));
          dispatch(getCalendar(token));
        }
      })
      .catch(err => dispatch(updateRsvpFailure(err.message)));
    })
    .catch(err => dispatch(updateRsvpFailure(err.message)));
  };
}

export function deleteEvent (token, event_id) {
  return (dispatch) => {
    dispatch(deleteEventRequest());
    fetch(`${Config.URI}/events/${event_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token
      }
    })
    .then((res) => {
      res.json()
      .then(() => {
        dispatch(deleteEventSuccess());
        dispatch(getCalendar(token));
      })
      .catch(err => dispatch(deleteEventFailure(err.message)));
    })
    .catch(err => dispatch(deleteEventFailure(err.message)));
  };
}
