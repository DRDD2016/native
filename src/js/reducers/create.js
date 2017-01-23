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
    { date: moment(), time: moment() }
  ],
  invitees: [],
  is_poll: undefined,
  isFetching: false,
  error: undefined,
  didSave: undefined
};

export default function create (state = initialState, action) {

  switch (action.type) {

    case actions.SET_DETAILS:
      return setDetails(state, action);

    case actions.SET_WHAT:
      return update(state, {
        what: { $splice: [[action.inputKey, 1, action.data]] }
      });

    case actions.SET_WHERE:
      return update(state, {
        where: { $splice: [[action.inputKey, 1, action.data]] }
      });

    case actions.SET_WHEN:
      return setWhen(state, action);

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

    case actions.CLEAR_CREATE_EVENT:
      return initialState;

    default:
      return state;
  }
}

function setDetails (state, action) {
  return update(state, {
    [action.field]: { $set: action.data }
  });
}

function setWhen (state, action) {

  const oldValue = state.when[action.inputKey];
  const newValue = update(oldValue, {
    [action.format]: { $set: action.data }
  });
  return update(state, {
    when: { $splice: [[action.inputKey, 1, newValue]] }
  });
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
