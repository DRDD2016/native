import * as actions from '../../../../src/js/actions/event/poll';


describe('POST_VOTE actions', () => {

  describe('`postVoteRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.POST_VOTE_REQUEST
      };

      const actual = actions.postVoteRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`postVoteSuccess` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.POST_VOTE_SUCCESS
      };

      const actual = actions.postVoteSuccess();
      expect(actual).toEqual(expected);
    });
  });

  describe('`postVoteFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.POST_VOTE_FAILURE,
        error
      };

      const actual = actions.postVoteFailure(error);
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
