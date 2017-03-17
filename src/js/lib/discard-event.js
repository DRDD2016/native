import { NavigationActions } from '@exponent/ex-navigation';
import { clearCreateEvent } from '../actions/create';
import { store } from '../init-store';

export default function discardEvent () {
  store.dispatch(clearCreateEvent());
  const navigatorUID = store.getState().navigation.currentNavigatorUID;
  store.dispatch(NavigationActions.popToTop(navigatorUID));
}
