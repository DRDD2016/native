import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { NavigationReducer } from '@exponent/ex-navigation';
// import auth from './auth';
import calendar from './calendar.old';
import event from './event/index';
import feed from './feed.old';
import create from './create';
import user from './user';
import reset from './reset-password';
import confirmUserEmail from './confirm-email';


export default combineReducers({
  navigation: NavigationReducer,
  calendar,
  event,
  feed,
  create,
  user,
  reset,
  confirmUserEmail,
  form
});
