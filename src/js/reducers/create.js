import update from 'immutability-helper';
import moment from 'moment';
import * as actions from '../actions/create';

export const initialState = {
  name: '',
  description: '',
  note: '',
  what: [''],
  where: [''],
  when: [
    { date: moment().format('DD MM YYYY'), time: '' }
  ],
  is_poll: undefined,
  isFetching: false,
  error: undefined,
  saveEventStatus: 'notStarted',
  isEventConfirmed: false
};

export default function create (state = initialState, action) {

  switch (action.type) {

    case actions.SET_DETAILS:
      return update(state, {
        [action.field]: { $set: action.data }
      });

    case actions.SET_WHAT:
      return update(state, {
        what: { $splice: [[action.inputKey, 1, action.data]] }
      });

    case actions.SET_WHERE:
      return update(state, {
        where: { $splice: [[action.inputKey, 1, action.data]] }
      });

    case actions.SET_WHEN: {
      const oldValue = state.when[action.inputKey];
      const newValue = update(oldValue, {
        [action.format]: { $set: action.data }
      });
      return update(state, {
        when: { $splice: [[action.inputKey, 1, newValue]] }
      });
    }

    case actions.ADD_INPUT:
      return addInput(state, action);

    case actions.REMOVE_INPUT:
      return update(state, {
        [action.category]: { $splice: [[action.inputKey, 1]] }
      });

    case actions.SAVE_EVENT_REQUEST:
      return update(state, {
        isFetching: { $set: true },
        saveEventStatus: { $set: 'Started' }
      });

    case actions.SAVE_EVENT_SUCCESS:
      return update(state, {
        isFetching: { $set: false }
      });

    case actions.SAVE_EVENT_FAILURE:
      return update(state, {
        isFetching: { $set: false },
        error: { $set: action.error }
      });

    case actions.SAVE_EVENT_DONE:
      return update(state, {
        saveEventStatus: { $set: 'Finished' }
      });

    case actions.SHARE_INVITE_REQUEST:
      return update(state, {
        isFetching: { $set: true }
      });

    case actions.SHARE_INVITE_SUCCESS:
      return update(state, {
        isFetching: { $set: false }
      });

    case actions.SHARE_INVITE_FAILURE:
      return update(state, {
        isFetching: { $set: false }
      });

    case actions.EVENT_CONFIRMED_REQUEST:
      return update(state, {
        isEventConfirmed: { $set: true }
      });

    case actions.EVENT_CONFIRMED_SUCCESS:
      return update(state, {
        isEventConfirmed: { $set: false }
      });

    case actions.EVENT_CONFIRMED_FAILURE:
      return update(state, {
        isEventConfirmed: { $set: false }
      });


    case actions.HYDRATE_CREATE_EVENT: {
      const dateTime = {
        date: parseIsoString(action.data.when[0], 'date'),
        time: parseIsoString(action.data.when[0], 'time')
      };
      return update(state, {
        name: { $set: action.data.name },
        description: { $set: action.data.description },
        note: { $set: action.data.note },
        what: { $splice: [[0, 1, action.data.what[0]]] },
        where: { $splice: [[0, 1, action.data.where[0]]] },
        when: { $splice: [[0, 1, dateTime]] }
      });
    }

    case actions.CLEAR_CREATE_EVENT:
      return initialState;

    default:
      return state;
  }
}

function parseIsoString (string, format) {
  if (format === 'date') {
    return moment(string.replace(':TBC', '')).format('DD MM YYYY');
  }
  if (format === 'time') {
    // if TBC, return the empty string
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z):TBC/.test(string)) {
      return '';
    }
    return moment(string).format('HH:mm');
  }
}


function addInput (state, action) {
  let initialValue;

  if (action.category === 'when') {

    initialValue = {
      date: state.when[action.nextInputKey - 1].date,
      time: state.when[action.nextInputKey - 1].time
    };
  } else {
    initialValue = '';
  }

  const newState = update(state, {
    [action.category]: { $push: [initialValue] }
  });
  return newState;
}
