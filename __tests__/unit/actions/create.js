import * as actions from '../../../src/js/actions/create';

jest.mock('react-native-fabric', () => {
  return {
    Crashlytics: {
      crash: () => {}
    },
    Answers: {
      logCustom: () => {},
      logContentView: () => {}
    }
  };
});

describe('create event actions', () => {

  describe('`setDetails` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.SET_DETAILS
      };

      const actual = actions.setDetails();
      expect(actual).toEqual(expected);
    });
  });

  describe('`setWhat` action creator', () => {

    it('returns expected action', () => {

      const data = true;
      const expected = {
        type: actions.SET_WHAT,
        data,
        inputKey: 2
      };

      const actual = actions.setWhat(data, 2);
      expect(actual).toEqual(expected);
    });
  });

  describe('`setWhere` action creator', () => {

    it('returns expected action', () => {

      const data = true;
      const expected = {
        type: actions.SET_WHERE,
        data,
        inputKey: 2
      };

      const actual = actions.setWhere(data, 2);
      expect(actual).toEqual(expected);
    });
  });

  describe('`setWhen` action creator', () => {

    it('returns expected action', () => {

      const data = true;
      const expected = {
        type: actions.SET_WHEN,
        data,
        inputKey: 2,
        format: 'date'
      };

      const actual = actions.setWhen(data, 2, 'date');
      expect(actual).toEqual(expected);
    });
  });

  describe('`saveEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.SAVE_EVENT_REQUEST
      };

      const actual = actions.saveEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`saveEventRequest` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.SAVE_EVENT_REQUEST
      };

      const actual = actions.saveEventRequest();
      expect(actual).toEqual(expected);
    });
  });

  describe('`saveEventFailure` action creator', () => {

    it('returns expected action', () => {

      const error = new Error();
      const expected = {
        type: actions.SAVE_EVENT_FAILURE,
        error
      };

      const actual = actions.saveEventFailure(error);
      expect(actual).toEqual(expected);
    });
  });

  describe('`clearCreateEvent` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.CLEAR_CREATE_EVENT
      };

      const actual = actions.clearCreateEvent();
      expect(actual).toEqual(expected);
    });
  });

  describe('`addInput` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.ADD_INPUT,
        nextInputKey: 2,
        category: 'where'
      };

      const actual = actions.addInput(2, 'where');
      expect(actual).toEqual(expected);
    });
  });

  describe('`removeInput` action creator', () => {

    it('returns expected action', () => {

      const expected = {
        type: actions.REMOVE_INPUT,
        inputKey: 2,
        category: 'where'
      };

      const actual = actions.removeInput(2, 'where');
      expect(actual).toEqual(expected);
    });
  });
});
