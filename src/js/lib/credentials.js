import { AsyncStorage } from 'react-native';

export function storeToken (token) { // eslint-disable-line
  try {
    AsyncStorage.setItem('spark_token', token);
  } catch (e) {
    console.error(e);
  }
}

export function storeUserId (user_id) { // eslint-disable-line
  try {
    AsyncStorage.setItem('spark_user_id', user_id.toString());
  } catch (e) {
    console.error(e);
  }
}
