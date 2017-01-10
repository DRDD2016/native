import { combineReducers } from 'redux';
import { NavigationReducer } from '@exponent/ex-navigation';
import { reducer as form } from 'redux-form';
import login from './login';
import signup from './signup';

export default combineReducers({
  navigation: NavigationReducer,
  form,
  login,
  signup
});
