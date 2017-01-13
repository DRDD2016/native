import * as actions from '../../../src/js/actions/calendar';

describe('GET_CALENDAR actions', () => {

  describe('`getCalendarRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.GET_CALENDAR_REQUEST
      };

      const actual = actions.getCalendarRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`signupUserSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = { email: 'donald@spark.com' };

      const expected = {
        type: actions.GET_CALENDAR_SUCCESS,
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
        type: actions.GET_CALENDAR_FAILURE,
        error
      };
      const actual = actions.signupUserFailure(error);

      expect(actual).toEqual(expected);
    });
  });
});
