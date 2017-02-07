export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILURE = 'GET_FEED_FAILURE';

export const getFeedRequest = () => ({
  type: GET_FEED_REQUEST
});

export const getFeedSuccess = () => ({
  type: GET_FEED_SUCCESS
});

export const getFeedFailure = () => ({
  type: GET_FEED_FAILURE
});
