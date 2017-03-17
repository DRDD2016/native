import { store } from '../init-store';
import { clearCreateEvent } from '../actions/create';

export default function discardEvent () {
  store.dispatch(clearCreateEvent());
}
