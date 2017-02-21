import * as actions from '../actions/feed';

const initialState = {
  data: [],
  isFetching: false,
  error: undefined,
  selectedFilter: undefined,
  filterActive: false
};

export default function feed (state = initialState, action) {

  switch (action.type) {

    case actions.GET_FEED_REQUEST:
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

    case actions.GET_FEED_FAILURE:
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
