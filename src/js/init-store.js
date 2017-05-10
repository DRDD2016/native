import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers/';

export function initStore (initialState) {

  return createStore(
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
export const persistor = persistStore(
  store,
  {
    storage: AsyncStorage,
    whitelist: ['user'],
    debounce: 2000
  }
);
