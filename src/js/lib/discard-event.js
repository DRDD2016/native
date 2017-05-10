import { NavigationActions } from 'react-navigation';
import { clearCreateEvent } from '../actions/create';
import { store } from '../init-store';

export default function discardEvent () {
  store.dispatch(clearCreateEvent());
  store.dispatch(NavigationActions.goBack());
}
