import { createStore, applyMiddleware, compose } from 'redux';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import throttle from 'lodash/throttle';
import rootReducer from './reducers/';
import { saveState, loadState } from './lib/persist-state';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation'
});

export function initStore (initialState) {

  return createStoreWithNavigation(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      devTools()
    )
  );
}

// initialise store with previous app state
const persistedState = loadState();
export const store = initStore(persistedState);

// save current app state to AsyncStorage every 2 secs
store.subscribe(throttle(() => {
  console.log('SAVING STATE!');
  saveState({
    user: store.getState().user
  });
}, 2000));
