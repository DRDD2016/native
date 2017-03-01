import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { NavigationReducer } from '@exponent/ex-navigation';
import calendar from './calendar';
import event from './event/index';
import feed from './feed';
import create from './create';
import user from './user';
import confirmUserEmail from './confirm-email';

const appReducer = combineReducers({
  navigation: NavigationReducer,
  calendar,
  event,
  feed,
  create,
  user,
  confirmUserEmail,
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
