import * as actions from '../../../src/js/actions/login';
import createThunk from '../../utils/mock-thunk';


describe('`loginUser` async action creator', () => {

  it('returns expected action', () => {

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.loginUser());

    [{ ...actual }] = queue;

    const expected = {
      type: actions.LOGIN_USER_REQUEST
    };
    expect(actual).toEqual(expected);
  });
});

describe('`loginUserRequest` action creator', () => {

  it('returns expected action', () => {

    const expected = {
      type: actions.LOGIN_USER_REQUEST
    };

    const actual = actions.loginUserRequest();
    expect(actual).toEqual(expected);
  });
});

describe('`loginUserSuccess` action creator', () => {

  it('returns expected action', () => {

    const expected = {
      type: actions.LOGIN_USER_SUCCESS
    };

    const actual = actions.loginUserSuccess();
    expect(actual).toEqual(expected);
  });
});

describe('`loginUserFailure` action creator', () => {

  it('returns expected action', () => {

    const error = new Error();
    const expected = {
      type: actions.LOGIN_USER_FAILURE,
      error
    };

    const actual = actions.loginUserFailure();
    expect(actual).toEqual(expected);
  });
});

describe('`logout` action creator', () => {

  it('returns expected action', () => {

    const expected = {
      type: actions.LOGOUT
    };

    const actual = actions.logout();
    expect(actual).toEqual(expected);
  });
});
