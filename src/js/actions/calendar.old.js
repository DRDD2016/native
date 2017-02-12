/* eslint-disable max-len */
export const GET_CALENDAR_REQUEST = 'GET_CALENDAR_REQUEST';
export const GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
export const GET_CALENDAR_FAILURE = 'GET_CALENDAR_FAILURE';
export const APPLY_FILTER = 'APPLY_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';


export function getCalendar () {
  return (dispatch) => {
    dispatch(getCalendarRequest());
    dispatch(getCalendarSuccess(true));
  };
}

export function getCalendarRequest () {
  return {
    type: GET_CALENDAR_REQUEST
  };
}

export function getCalendarSuccess (data) {
  return {
    type: GET_CALENDAR_SUCCESS,
    data
  };
}

export function getCalendarFailure (error) {
  return {
    type: GET_CALENDAR_FAILURE,
    error
  };
}

export const applyFilter = selectedFilter => ({
  type: APPLY_FILTER,
  selectedFilter
});


export const clearFilter = () => ({
  type: CLEAR_FILTER
});
