import * as actions from '../../../src/js/actions/reset-password';

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


describe('RESET_PASSWORD actions', () => {

  describe('`resetPasswordRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.RESET_PASSWORD_REQUEST
      };

      const actual = actions.resetPasswordRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`resetPasswordSuccess` action creator', () => {

    it('returns expected action', () => {

      const data = true;
      const expected = {
        type: actions.RESET_PASSWORD_SUCCESS,
        data
      };

      const actual = actions.resetPasswordSuccess(data);
      expect(actual).toEqual(expected);
    });
  });

  describe('`resetPasswordFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.RESET_PASSWORD_FAILURE,
        error
      };

      const actual = actions.resetPasswordFailure(error);
      expect(actual).toEqual(expected);
    });
  });

});
