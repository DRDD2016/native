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

describe('FINALISE_EVENT actions', () => {

  describe('`finaliseEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.FINALISE_EVENT_REQUEST
      };

      const actual = actions.finaliseEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`finaliseEventSuccess` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.FINALISE_EVENT_SUCCESS
      };

      const actual = actions.finaliseEventSuccess();
      expect(actual).toEqual(expected);
    });
  });

  describe('`finaliseEventFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.FINALISE_EVENT_FAILURE,
        error
      };

      const actual = actions.finaliseEventFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});
