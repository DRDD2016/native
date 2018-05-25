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

// export function getCalendarHostUserData (hostIDs) {
//
//   return (dispatch) => {
//
//     dispatch(getCalendarHostUserDataRequest());
//     console.log('getArrayOfUsersByIdArray action for ids: ', hostIDs);
//
//     fetch(`${Config.URI}/users/${user_id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         authorization: token,
//         'Cache-Control': 'no-cache',
//         Pragma: 'no-cache'
//       }
//     })
//     .then((res) => {
//       res.json()
//       .then((data) => {
//         console.log('getUser response data:', data);
//         const eventData = {
//           firstname: data.firstname,
//           surname: data.surname,
//           photo_url: data.photo_url
//         };
//         dispatch(getUserByIdSuccess(eventData));
//
//       })
//       .catch((err) => {
//         console.log('caught getUser error: ', err);
//         dispatch(getUserByIdFailure(err.message));
//       });
//     })
//     .catch((err) => {
//       console.log('caught getUser error: ', err);
//       dispatch(getUserByIdFailure(err.message));
//     });
//   }
// }


export function getCalendar (token) {
  return (dispatch) => {
    dispatch(getCalendarRequest());
    fetch(`${Config.URI}/calendar`, {
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
            if (data) {
              dispatch(getCalendarSuccess(data));
              // const hostIDs = data.map(event => event.host_user_id);
              // dispatch(getCalendarHostUserData(hostIDs));


            }
          })
          .catch(err => dispatch(getCalendarFailure(err.message)));
      })
      .catch(err => dispatch(getCalendarFailure(err.message)));
  };
}


export const applyFilter = selectedFilter => ({
  type: APPLY_FILTER,
  selectedFilter
});


export const clearFilter = () => ({
  type: CLEAR_FILTER
});
