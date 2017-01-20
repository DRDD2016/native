import * as actions from '../../../src/js/actions/confirm-email';

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


describe('CONFIRM_EMAIL actions', () => {

  describe('`confirmEmailRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.CONFIRM_EMAIL_REQUEST
      };

      const actual = actions.confirmEmailRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`confirmEmailSuccess` action creator', () => {

    it('returns expected action', () => {

      const data = true;
      const expected = {
        type: actions.CONFIRM_EMAIL_SUCCESS,
        data
      };

      const actual = actions.confirmEmailSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`confirmEmailFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.CONFIRM_EMAIL_FAILURE,
        error
      };

      const actual = actions.confirmEmailFailure(error);
      expect(actual).toEqual(expected);
    });
  });

});
