export const UPDATE_POLL = 'UPDATE_POLL'; // redux form?

export const VOTE = 'VOTE';
export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const ADD_HOST_EVENT_CHOICE = 'ADD_HOST_EVENT_CHOICE'; // redux form?

export const CONFIRM_EVENT = 'CONFIRM_EVENT';
export const CONFIRM_EVENT_REQUEST = 'CONFIRM_EVENT_REQUEST';
export const CONFIRM_EVENT_SUCCESS = 'CONFIRM_EVENT_SUCCESS';
export const CONFIRM_EVENT_FAILURE = 'CONFIRM_EVENT_FAILURE';

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

export function vote (poll, event_id) {
  return (dispatch) => {
    const payload = {
      poll,
      event_id,
      user_id
    };

    dispatch(voteRequest());

    // axios.post('/confirm-poll', payload)
    //   .then((response) => {
    //     dispatch(voteSuccess(response.data));
    //     dispatch(getEvent(event_id));
    //   })
    //   .catch((error) => {
    //     dispatch(voteFailure(error));
    //   });
  };
}

export function voteRequest () {
  return {
    type: VOTE_REQUEST,
    isFetching: true
  };
}

export function voteSuccess () {
  return {
    type: VOTE_SUCCESS,
    isFetching: false
  };
}
export function voteFailure () {
  return {
    type: VOTE_FAILURE,
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

export function confirmEvent (hostEventChoices, event_id) {
  return (dispatch) => {
    // const payload = {
    //   hostEventChoices,
    //   event_id
    // };

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
