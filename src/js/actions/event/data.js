export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';
export const PATCH_EVENT_REQUEST = 'PATCH_EVENT_REQUEST';
export const PATCH_EVENT_SUCCESS = 'PATCH_EVENT_SUCCESS';
export const PATCH_EVENT_FAILURE = 'PATCH_EVENT_FAILURE';

const event1 = {
  event_id: 1,
  host_user_id: 1,
  name: 'Lounge party',
  description: 'Celebrating life',
  is_poll: false,
  vote_count: {
    what: [2, 2],
    where: [3, 0],
    when: [1, 2]
  },
  invitees: [2],
  what: ['dancing'],
  where: ['Forest'],
  when: [{ date: '01-01-2017', time: '12:00:00' }],
  rsvps: { going: [], not_going: [], maybe: [] }
};

export function getEvent (event_id) { //eslint-disable-line
  return (dispatch) => {
    dispatch(getEventRequest());
    dispatch(getEventSuccess(event1));
  };
}

export function getEventRequest () {
  return {
    type: GET_EVENT_REQUEST
  };
}

export function getEventSuccess (data) {
  return {
    type: GET_EVENT_SUCCESS,
    data
  };
}

export function getEventFailure (error) {
  return {
    type: GET_EVENT_FAILURE,
    error
  };
}

export function patchEvent (data) { //eslint-disable-line
  return (dispatch) => {

    dispatch(patchEventRequest());

    // fetch
  };
}

export function patchEventRequest () {
  return {
    type: PATCH_EVENT_REQUEST
  };
}

export function patchEventSuccess () {
  return {
    type: PATCH_EVENT_SUCCESS
  };
}

export function patchEventFailure (error) {
  return {
    type: PATCH_EVENT_FAILURE,
    error
  };
}
