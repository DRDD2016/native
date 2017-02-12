export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILURE = 'GET_FEED_FAILURE';
export const APPLY_FILTER = 'APPLY_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';


export const getFeedRequest = () => ({
  type: GET_FEED_REQUEST
});

export const getFeedSuccess = data => ({
  type: GET_FEED_SUCCESS,
  data
});

export const getFeedFailure = error => ({
  type: GET_FEED_FAILURE,
  error
});

export const applyFilter = selectedFilter => ({
  type: APPLY_FILTER,
  selectedFilter
});


export const clearFilter = () => ({
  type: CLEAR_FILTER
});
