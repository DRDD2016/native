import * as actions from '../../../src/js/actions/signup';

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

describe('SIGNUP_USER actions', () => {

  describe('`signupUserRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.SIGNUP_USER_REQUEST
      };

      const actual = actions.signupUserRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`signupUserSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = { email: 'donald@spark.com' };

      const expected = {
        type: actions.SIGNUP_USER_SUCCESS,
        data
      };

      const actual = actions.signupUserSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`signupUserFailure` action creator', () => {

    it('returns expected action', () => {
      const error = new Error();
      const expected = {
        type: actions.SIGNUP_USER_FAILURE,
        error
      };
      const actual = actions.signupUserFailure(error);

      expect(actual).toEqual(expected);
    });
  });

});
