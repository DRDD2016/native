import * as actions from '../actions/feed';

const initialState = {
  data: [],
  isFetching: true, // maybe this shouldn't be true
  error: undefined,
  selectedFilter: undefined,
  filterActive: false,
  saveEventDone: false
};

export default function feed (state = initialState, action) {

  switch (action.type) {

    case actions.GET_FEED_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.FEED_ITEM_TOUCHED_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actions.GET_FEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: [...state.data, ...action.data]
      };

    case actions.FEED_ITEM_TOUCHED_SUCCESS: {
      const index = state.data.findIndex((ele) => { // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        return ele.id.toString() === action.id.toString();
      });
      const newFeed = [...state.data];
      newFeed[index].feed_item.viewed = true;
      return {
        ...state,
        isFetching: false,
        data: newFeed
      };
    }

    case actions.GET_FEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.FEED_ITEM_TOUCHED_FAILURE:
      return {
        ...state,
        isFetching: false,
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
