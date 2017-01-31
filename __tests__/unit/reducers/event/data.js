import data, { initialState } from '../../../../src/js/reducers/event/data';
import * as actions from '../../../../src/js/actions/event/data';

const event1 = {
  event_id: 1,
  code: 'abcd',
  host_user_id: 1,
  name: 'Lounge party',
  description: 'Celebrating life',
  is_poll: true,
  what: ['dancing', 'singing'],
  where: ['Forest', 'London'],
  when: ['2017-01-31T15:31:14.610Z', '2017-02-31T15:31:14.610Z'],
  invitees: [2],
  isFetching: false
};

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
    const expected = event1;
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
    const expected = event1;
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
