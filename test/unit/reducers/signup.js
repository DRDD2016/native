import test from 'tape';
import reducer, { initialState } from '../../../src/js/reducers/signup';

test('SIGNUP_USER_REQUEST works', (t) => {

  t.plan(1);
  const action = {
    type: 'SIGNUP_USER_REQUEST'
  };
  const expected = {
    isSigningUp: true,
    error: undefined
  };
  const result = reducer(initialState, action);

  t.deepEqual(result, expected);
});

test('SIGNUP_USER_SUCCESS works', (t) => {
  t.plan(1);

  const state = Object.assign({}, { isSigningUp: true });
  const data = true;
  const action = {
    type: 'SIGNUP_USER_SUCCESS',
    data
  };
  const expected = {
    isSigningUp: false,
    error: undefined
  };
  const result = reducer(state, action);

  t.deepEqual(result, expected);
});

test('SIGNUP_USER_FAILURE works', (t) => {
  t.plan(1);

  const error = new Error();
  const action = {
    type: 'SIGNUP_USER_FAILURE',
    error
  };
  const expected = {
    isSigningUp: false,
    error
  };
  const result = reducer(initialState, action);

  t.deepEqual(result, expected);
});
