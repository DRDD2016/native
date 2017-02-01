export const POST_VOTE_REQUEST = 'POST_VOTE_REQUEST';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_VOTE_FAILURE = 'POST_VOTE_FAILURE';

export const CONFIRM_EVENT_REQUEST = 'CONFIRM_EVENT_REQUEST';
export const CONFIRM_EVENT_SUCCESS = 'CONFIRM_EVENT_SUCCESS';
export const CONFIRM_EVENT_FAILURE = 'CONFIRM_EVENT_FAILURE';


/********
* VOTE ACTIONS
********/

export function postVote (token, vote, event_id) { // eslint-disable-line
  return (dispatch) => {
    dispatch(postVoteRequest());

    fetch('http://localhost:3000/votes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ vote, event_id })
    })
    .then((res) => {
      console.log(res);
      dispatch(postVoteSuccess());
    })
    .catch((err) => {
      console.error(err);
      dispatch(postVoteFailure(err));
    });
  };
}

export function postVoteRequest () {
  return {
    type: POST_VOTE_REQUEST
  };
}

export function postVoteSuccess () {
  return {
    type: POST_VOTE_SUCCESS
  };
}
export function postVoteFailure (error) {
  return {
    type: POST_VOTE_FAILURE,
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
