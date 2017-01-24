import data, { initialState } from '../../../../src/js/reducers/event/data';
import * as actions from '../../../../src/js/actions/event/data';

describe('data reducer', () => {

  it('handles GET_EVENT_REQUEST', () => {
    const state = { ...initialState };
    const action = {
      type: actions.GET_EVENT_REQUEST
    };
    const expected = { ...state, isFetching: true };
    const result = data(state, action);
    expect(result).toEqual(expected);
  });

  it('handles GET_EVENT_SUCCESS', () => {
    const state = { ...initialState, isFetching: true };
    const action = {
      type: actions.GET_EVENT_SUCCESS
    };
    const expected = { ...state, isFetching: false };
    const result = data(state, action);
    expect(result).toEqual(expected);
  });

  it('handles GET_EVENT_FAILURE', () => {
    const state = { ...initialState, isFetching: true };
    const error = new Error();
    const action = {
      type: actions.GET_EVENT_FAILURE,
      error
    };
    const expected = { ...state, isFetching: false, error };
    const result = data(state, action);
    expect(result).toEqual(expected);
  });

  it('handles PATCH_EVENT_REQUEST', () => {
    const state = { ...initialState };
    const action = {
      type: actions.PATCH_EVENT_REQUEST
    };
    const expected = { ...state, isFetching: true };
    const result = data(state, action);
    expect(result).toEqual(expected);
  });

  it('handles PATCH_EVENT_SUCCESS', () => {
    const state = { ...initialState, isFetching: true };
    const action = {
      type: actions.PATCH_EVENT_SUCCESS
    };
    const expected = { ...state, isFetching: false };
    const result = data(state, action);
    expect(result).toEqual(expected);
  });

  it('handles PATCH_EVENT_FAILURE', () => {
    const state = { ...initialState, isFetching: true };
    const error = new Error();
    const action = {
      type: actions.PATCH_EVENT_FAILURE,
      error
    };
    const expected = { ...state, isFetching: false, error };
    const result = data(state, action);
    expect(result).toEqual(expected);
  });
});
