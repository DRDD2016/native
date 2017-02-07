export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILURE = 'GET_FEED_FAILURE';

// missing apply/remove filter actions

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
