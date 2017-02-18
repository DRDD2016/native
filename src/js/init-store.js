import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers/';

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
      autoRehydrate({ log: true }),
      devTools()
    )
  );
}
export const store = initStore();
// initialise store with previous app state
persistStore(
  store,
  {
    storage: AsyncStorage,
    whitelist: ['user'],
    debounce: 2000
  }
);
