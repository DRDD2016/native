import { AsyncStorage } from 'react-native';
/**
 * loadState returns serialised app state from device AsyncStorage
 * @returns {object} serialised state object
 */

export function loadState () {

  try {
    const serialisedState = AsyncStorage.getItem('spark_user_state');
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * saveState saves serialised app state to device AsyncStorage
 * @param {object} state - app state
 * @returns {void}
 */

export function saveState (state) {
  try {
    const serialisedState = JSON.stringify(state);
    AsyncStorage.setItem('spark_user_state', serialisedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
