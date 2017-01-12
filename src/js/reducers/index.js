import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { NavigationReducer } from '@exponent/ex-navigation';
// import auth from './auth';
import profile from './profile';
import calendar from './calendar';
import event from './event/index';
import feed from './feed';
import create from './create';
import photos from './photos';
import signup from './signup';
import login from './login';


export default combineReducers({
  navigation: NavigationReducer,
  profile,
  calendar,
  event,
  feed,
  create,
  photos,
  signup,
  login,
  form
});
