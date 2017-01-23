import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { NavigationReducer } from '@exponent/ex-navigation';
// import auth from './auth';
import profile from './profile.old';
import calendar from './calendar.old';
import event from './event/index';
import feed from './feed.old';
import create from './create';
import signup from './signup';
import login from './login';
import reset from './reset-password';
import confirmEmail from './confirm-email';


export default combineReducers({
  navigation: NavigationReducer,
  profile,
  calendar,
  event,
  feed,
  create,
  signup,
  login,
  reset,
  confirmEmail,
  form
});
