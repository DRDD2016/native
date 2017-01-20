import * as actions from '../../../../src/js/actions/event/poll';


describe('VOTE actions', () => {

  describe('`voteRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.VOTE_REQUEST
      };

      const actual = actions.voteRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`voteSuccess` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.VOTE_SUCCESS
      };

      const actual = actions.voteSuccess();
      expect(actual).toEqual(expected);
    });
  });

  describe('`voteFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.VOTE_FAILURE,
        error
      };

      const actual = actions.voteFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});

describe('CONFIRM_EVENT actions', () => {

  describe('`confirmEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.CONFIRM_EVENT_REQUEST
      };

      const actual = actions.confirmEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`confirmEventSuccess` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.CONFIRM_EVENT_SUCCESS
      };

      const actual = actions.confirmEventSuccess();
      expect(actual).toEqual(expected);
    });
  });

  describe('`confirmEventFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.CONFIRM_EVENT_FAILURE,
        error
      };

      const actual = actions.confirmEventFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});
