/* eslint-disable max-len */
import * as actions from '../actions/calendar';

const initialState = {
  data: [],
  isFetching: false,
  error: undefined,
  selectedFilter: undefined,
  filterActive: false
};

export default function calendar (state = initialState, action) {

  switch (action.type) {

    case actions.GET_CALENDAR_REQUEST:
      return { ...state, isFetching: true };

    case actions.GET_CALENDAR_SUCCESS:
      return { ...state, isFetching: false, data: action.data };

    case actions.GET_CALENDAR_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case actions.APPLY_FILTER:
      return { ...state, filterActive: true, selectedFilter: action.selectedFilter };

    case actions.CLEAR_FILTER:
      return { ...state, filterActive: false, selectedFilter: undefined };

    default:
      return state;
  }
}
