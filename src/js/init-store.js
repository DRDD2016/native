import { AsyncStorage, Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createFilter } from 'redux-persist-transform-filter';
import rootReducer from './reducers/';
import { navMiddleware } from './routes';

export function initStore (initialState) {
  if (Platform.OS === 'ios') {

    return createStore(
      rootReducer,
      initialState,
        compose(
          applyMiddleware(thunkMiddleware, navMiddleware, logger),
          autoRehydrate({ log: true })
        )
    );
  }
  return createStore(
    rootReducer,
    initialState,
    compose(  // composeWithDevTools if debugging redux android
      applyMiddleware(thunkMiddleware, navMiddleware), // remove logger from last in chain when not debugging
      autoRehydrate({ log: true })
    )
  );
}
export const store = initStore();
// initialise store with previous app state

// you want to store only a subset of your state of reducer one
const saveSubsetFilter1 = createFilter(
  'user',
  [
    'firstname',
    'surname',
    'email',
    'photo_url',
    'user_id',
    'push_info',
    'user_update_no',
    'user_open_no'
  ]
);

const saveSubsetFilter2 = createFilter(
  'feed',
  [
    'data'
  ]
);

const saveSubsetFilter3 = createFilter(
  'calendar',
  [
    'data'
  ]
);

// add another subset filter for calendar

export const persistor = persistStore(
  store,
  {
    storage: AsyncStorage,
    transforms: [
      saveSubsetFilter1,
      saveSubsetFilter2,
      saveSubsetFilter3
    ],
    whitelist: ['user', 'feed', 'calendar'],
    debounce: 2000
  }
);

/*
to clear the old app state in AsyncStorage:
1. uncomment the line below
2. run the app once for each OS - the app state will be purged
3. delete the line below
 */

// persistor.purge();
