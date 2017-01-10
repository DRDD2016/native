import { createStore, applyMiddleware, compose } from 'redux';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from './reducers/index';

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

export const store = initStore();
