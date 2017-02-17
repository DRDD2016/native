import * as actions from '../../../../src/js/actions/event/data';


describe('GET_EVENT actions', () => {

  describe('`getEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.GET_EVENT_REQUEST
      };

      const actual = actions.getEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`getEventSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = {};
      const expected = {
        type: actions.GET_EVENT_SUCCESS,
        data
      };

      const actual = actions.getEventSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`getEventFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.GET_EVENT_FAILURE,
        error
      };

      const actual = actions.getEventFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});


describe('SUBMIT_CODE_EVENT actions', () => {

  describe('`submitCodeRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.SUBMIT_CODE_REQUEST
      };

      const actual = actions.submitCodeRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`submitCodeSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = {};
      const expected = {
        type: actions.SUBMIT_CODE_SUCCESS,
        data
      };

      const actual = actions.submitCodeSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`submitCodeFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.SUBMIT_CODE_FAILURE,
        error
      };

      const actual = actions.submitCodeFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});


describe('EDIT_EVENT actions', () => {

  describe('`editEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.EDIT_EVENT_REQUEST
      };

      const actual = actions.editEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`editEventSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = {};
      const expected = {
        type: actions.EDIT_EVENT_SUCCESS,
        data
      };

      const actual = actions.editEventSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`editEventFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.EDIT_EVENT_FAILURE,
        error
      };

      const actual = actions.editEventFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});


describe('UPDATE_RSVP actions', () => {

  describe('`updateRsvpRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.UPDATE_RSVP_REQUEST
      };

      const actual = actions.updateRsvpRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`updateRsvpSuccess` action creator', () => {

    it('returns expected action', () => {
      const data = { going: [{ firstname: 'Mickey', surname: 'Mouse' }] };
      const expected = {
        type: actions.UPDATE_RSVP_SUCCESS,
        data
      };

      const actual = actions.updateRsvpSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`updateRsvpFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.UPDATE_RSVP_FAILURE,
        error
      };

      const actual = actions.updateRsvpFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});
