import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import calendar from './calendar';
import event from './event/index';
import feed from './feed';
import create from './create';
import user from './user';
import confirmUserEmail from './confirm-email';
import network from './network';
import { StackRoot } from '../routes';


const appReducer = combineReducers({
  nav: (state, action) => StackRoot.router.getStateForAction(action, state),
  calendar,
  event,
  feed,
  create,
  user,
  confirmUserEmail,
  network,
  form
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = { // eslint-disable-line no-param-reassign
      ...state,
      calendar: undefined,
      event: undefined,
      feed: undefined,
      create: undefined,
      user: undefined,
      confirmUserEmail: undefined
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
