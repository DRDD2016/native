export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

const event1 = {
  event_id: 1,
  host_user_id: 1,
  name: 'Lounge party',
  description: 'Celebrating life',
  is_poll: true,
  is_edited: false,
  _invitees: [2],
  _what: ['dancing', 'skydiving'],
  _where: ['Forest', 'Camping'],
  _when: ['2017-01-03T00:00:00.000Z', '2017-02-14T00:00:00.000Z']
};

export function getEvent (event_id) { //eslint-disable-line
  return (dispatch) => {
    dispatch(getEventRequest());
    dispatch(getEventSuccess(event1));
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
