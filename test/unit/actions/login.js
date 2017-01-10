import test from 'tape';
import * as actions from '../../../src/js/actions/login';
import createThunk from '../../utils/mock-thunk';


test.skip('loginUser async action creator returns expected action', (t) => {
  t.plan(1);

  // let actual;
  // const { dispatch, queue } = createThunk();
  // dispatch(actions.loginUser());
  //
  // [{ ...actual }] = queue;

  const expected = {
    type: actions.LOGIN_USER_REQUEST
  };
  t.deepEqual(actual, expected);
});

test.only('loginUserRequest creates the correct action', (t) => {
  t.plan(1);

  const expected = {
    type: actions.LOGIN_USER_REQUEST
  };

  const actual = actions.loginUserRequest();
  t.deepEqual(actual, expected);
});

test('loginUserSuccess creates the correct action', (t) => {
  t.plan(1);

  const data = true;
  const expected = {
    type: actions.LOGIN_USER_SUCCESS,
    data
  };

  const actual = actions.loginUserSuccess(data);
  t.deepEqual(actual, expected);
});

test('loginUserFailure creates the correct action', (t) => {
  t.plan(1);

  const error = new Error();
  const expected = {
    type: actions.LOGIN_USER_FAILURE,
    error
  };
  const actual = actions.loginUserFailure(error);
  t.deepEqual(actual, expected);
});

test('logout creates the correct action', (t) => {
  t.plan(1);

  const expected = {
    type: actions.LOGOUT
  };

  const actual = actions.logout();
  t.deepEqual(actual, expected);
});
