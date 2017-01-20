export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const CONFIRM_EVENT_REQUEST = 'CONFIRM_EVENT_REQUEST';
export const CONFIRM_EVENT_SUCCESS = 'CONFIRM_EVENT_SUCCESS';
export const CONFIRM_EVENT_FAILURE = 'CONFIRM_EVENT_FAILURE';


/********
* VOTE ACTIONS
********/

export function vote (poll, event_id) { // eslint-disable-line
  return (dispatch) => {
    // const payload = {
    //   poll,
    //   event_id,
    //   user_id
    // };

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
    type: VOTE_REQUEST
  };
}

export function voteSuccess () {
  return {
    type: VOTE_SUCCESS
  };
}
export function voteFailure (error) {
  return {
    type: VOTE_FAILURE,
    error
  };
}


/********
* CONFIRM EVENT ACTIONS
********/

export function confirmEvent (hostEventChoices, event_id) { // eslint-disable-line
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
    type: CONFIRM_EVENT_REQUEST
  };
}

export function confirmEventSuccess () {
  return {
    type: CONFIRM_EVENT_SUCCESS
  };
}
export function confirmEventFailure (error) {
  return {
    type: CONFIRM_EVENT_FAILURE,
    error
  };
}
