import Config from 'react-native-config';

export const GET_CALENDAR_REQUEST = 'GET_CALENDAR_REQUEST';
export const GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';
export const GET_CALENDAR_FAILURE = 'GET_CALENDAR_FAILURE';
export const APPLY_FILTER = 'APPLY_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';


export const getCalendarRequest = () => ({
  type: GET_CALENDAR_REQUEST
});

export const getCalendarSuccess = data => ({
  type: GET_CALENDAR_SUCCESS,
  data
});

export const getCalendarFailure = error => ({
  type: GET_CALENDAR_FAILURE,
  error
});

export function getCalendar (token) {
  return (dispatch) => {
    dispatch(getCalendarRequest());
    fetch(`${Config.URI}/calendar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token
      }
    })
    .then((res) => {
      res.json()
      .then((data) => {
        if (data) {
          dispatch(getCalendarSuccess(data));
        }
      })
      .catch(err => dispatch(getCalendarFailure(err)));
    })
    .catch(err => dispatch(getCalendarFailure(err)));
  };
}


export const applyFilter = selectedFilter => ({
  type: APPLY_FILTER,
  selectedFilter
});


export const clearFilter = () => ({
  type: CLEAR_FILTER
});
