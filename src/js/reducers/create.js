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
    { date: moment().format('DD MM YYYY'), time: moment().format('HH:mm') }
  ],
  is_poll: undefined,
  isFetching: false,
  error: undefined
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
        isFetching: { $set: true }
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

    case actions.HYDRATE_CREATE_EVENT: {
      const dateTime = {
        date: moment(action.data.when[0]).format('DD MM YYYY'),
        time: moment(action.data.when[0]).format('HH:mm')
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
