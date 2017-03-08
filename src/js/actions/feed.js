import Config from 'react-native-config';

export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILURE = 'GET_FEED_FAILURE';
export const APPLY_FILTER = 'APPLY_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const FEED_ITEM_TOUCHED_REQUEST = 'FEED_ITEM_TOUCHED_REQUEST';
export const FEED_ITEM_TOUCHED_SUCCESS = 'FEED_ITEM_TOUCHED_SUCCESS';
export const FEED_ITEM_TOUCHED_FAILURE = 'FEED_ITEM_TOUCHED_FAILURE';


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

export const feedItemTouchedRequest = () => ({
  type: FEED_ITEM_TOUCHED_REQUEST
});

export const feedItemTouchedSuccess = id => ({
  type: FEED_ITEM_TOUCHED_SUCCESS,
  id
});

export const feedItemTouchedFailure = error => ({
  type: FEED_ITEM_TOUCHED_FAILURE,
  error
});

export function feedItemTouched (token, feed_item_id) {

  return (dispatch) => {
    dispatch(feedItemTouchedRequest());
    fetch(`${Config.URI}/users/:user_id/feed`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: feed_item_id })
    })
    .then(() => {
      dispatch(feedItemTouchedSuccess(feed_item_id));
    })
    .catch((error) => {
      dispatch(feedItemTouchedFailure(error.message));
    });
  };
}
