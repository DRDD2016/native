import { combineReducers } from 'redux';
import data from './data';
import poll from './poll';

export default combineReducers({
  data,
  poll
});
