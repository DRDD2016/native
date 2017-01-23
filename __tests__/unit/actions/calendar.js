import * as actions from '../../../src/js/actions/calendar.old';

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

  describe('`getCalendarSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = { email: 'donald@spark.com' };

      const expected = {
        type: actions.GET_CALENDAR_SUCCESS,
        data
      };

      const actual = actions.getCalendarSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`getCalendarFailure` action creator', () => {

    it('returns expected action', () => {
      const error = new Error();
      const expected = {
        type: actions.GET_CALENDAR_FAILURE,
        error
      };
      const actual = actions.getCalendarFailure(error);

      expect(actual).toEqual(expected);
    });
  });
});
