import * as actions from '../../../src/js/actions/login';

jest.mock('react-native-fabric', () => {
  return {
    Crashlytics: {
      crash: () => {}
    },
    Answers: {
      logCustom: () => {},
      logContentView: () => {}
    }
  };
});

jest.mock('react-native-branch', () => {
  return {
    AddToCartEvent: 'Add To Cart',
    subscribe: (cb) => { cb({ params: {}, error: null }); }

    // and for createBranchUniversalObject, etc.
  };
});

// import createThunk from '../../utils/mock-thunk';
//
// describe('`loginUser` async action creator', () => {
//
//   it('returns expected action', () => {
//
//     let actual;
//     const { dispatch, queue } = createThunk();
//     dispatch(actions.loginUser());
//
//     [{ ...actual }] = queue;
//
//     const expected = {
//       type: actions.LOGIN_USER_REQUEST
//     };
//     expect(actual).toEqual(expected);
//   });
// });
describe('LOGIN_USER actions', () => {

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

      const data = true;
      const expected = {
        type: actions.LOGIN_USER_SUCCESS,
        data
      };

      const actual = actions.loginUserSuccess(data);
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

      const actual = actions.loginUserFailure(error);
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
});
