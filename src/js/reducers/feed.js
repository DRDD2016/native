import * as actions from '../actions/feed';

const initialState = {
  data: [],
  isReceivingFeed: false,
  isFetchingFeed: false,
  isTouchedFetching: false,
  isFetchingEvent: false,
  error: undefined,
  selectedFilter: undefined,
  filterActive: false
};

export default function feed (state = initialState, action) {

  switch (action.type) {

    case actions.FETCHING_EVENT_FROM_FEEDITEM_REQUEST:
      return {
        ...state,
        isFetchingEvent: true
      };

    case actions.FETCHING_EVENT_FROM_FEEDITEM_SUCCESS:
      return {
        ...state,
        isFetchingEvent: false
      };

    case actions.FETCHING_EVENT_FROM_FEEDITEM_FAILURE:
      return {
        ...state,
        isFetchingEvent: false
      };

    case actions.HAVE_FEED_REQUEST:
      return {
        ...state,
        isFetchingFeed: true
      };

    case actions.HAVE_FEED_SUCCESS:
      return {
        ...state,
        isFetchingFeed: false
      };

    case actions.HAVE_FEED_FAILURE:
      return {
        ...state,
        isFetchingFeed: false
      };

    case actions.GET_FEED_REQUEST:
      return {
        ...state,
        isReceivingFeed: true
      };

    case actions.GET_FEED_SUCCESS:
      return {
        ...state,
        isReceivingFeed: false,
        data: [...state.data, ...action.data]
      };

    case actions.GET_FEED_FAILURE:
      return {
        ...state,
        isReceivingFeed: false,
        error: action.error
      };

    case actions.FEED_ITEM_TOUCHED_REQUEST:
      return {
        ...state,
        isTouchedFetching: true
      };

    case actions.FEED_ITEM_TOUCHED_SUCCESS: {
      const index = state.data.findIndex((ele) => { // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        return ele.id.toString() === action.id.toString();
      });
      const newFeed = [...state.data];
      newFeed[index].feed_item.viewed = true;
      return {
        ...state,
        isTouchedFetching: false,
        data: newFeed
      };
    }

    case actions.FEED_ITEM_TOUCHED_FAILURE:
      return {
        ...state,
        isTouchedFetching: false,
        error: action.error
      };

    case actions.APPLY_FILTER:
      return { ...state, filterActive: true, selectedFilter: action.selectedFilter };

    case actions.CLEAR_FILTER:
      return { ...state, filterActive: false, selectedFilter: undefined };

    default:
      return state;
  }
}
