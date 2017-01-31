import * as actions from '../../../../src/js/actions/event/data';

// const eventData = {
//   event_id: 1,
//   host_user_id: 1,
//   name: 'Lounge party',
//   description: 'Celebrating life',
//   is_poll: false,
//   is_edited: false,
//   _invitees: [2],
//   _what: ['dancing', 'skydiving'],
//   _where: ['Forest', 'Camping'],
//   _when: [{ date: '01-01-2017', time: '12:00:00' }, { date: '03-01-2017', time: '15:00:00' }],
//   _rsvps: { going: [], not_going: [], maybe: [] }
// };


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

      const data = true;
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

describe('PATCH_EVENT actions', () => {

  describe('`patchEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.PATCH_EVENT_REQUEST
      };

      const actual = actions.patchEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`patchEventSuccess` action creator', () => {

    it('returns expected action', () => {

      const data = true;
      const expected = {
        type: actions.PATCH_EVENT_SUCCESS,
        data
      };

      const actual = actions.patchEventSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`patchEventFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.PATCH_EVENT_FAILURE,
        error
      };

      const actual = actions.patchEventFailure(error);
      expect(actual).toEqual(expected);
    });
  });
});
