import { combineReducers } from 'redux';
import {
  createNavigationReducer
} from 'react-navigation-redux-helpers';
import { reducer as form } from 'redux-form';
import calendar from './calendar';
import event from './event/index';
import feed from './feed';
import create from './create';
import user from './user';
import confirmUserEmail from './confirm-email';
import network from './network';
import { AppNavigator } from '../routes';

const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
  nav: navReducer,
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
