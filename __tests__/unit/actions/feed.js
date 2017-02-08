import * as actions from '../../../src/js/actions/feed';

describe('GET_FEED actions', () => {

  describe('`getFeedRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.GET_FEED_REQUEST
      };

      const actual = actions.getFeedRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`getFeedSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = [
        { data: 'some data' },
        { data: 'some data' },
        { data: 'some data' }
      ];

      const expected = {
        type: actions.GET_FEED_SUCCESS,
        data
      };

      const actual = actions.getFeedSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`getFeedFailure` action creator', () => {

    it('returns expected action', () => {
      const error = new Error();
      const expected = {
        type: actions.GET_FEED_FAILURE,
        error
      };
      const actual = actions.getFeedFailure(error);

      expect(actual).toEqual(expected);
    });
  });
});
