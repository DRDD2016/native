import { AsyncStorage } from 'react-native';

export function storeToken (token) {
  try {
    AsyncStorage.setItem('spark_token', token);
  } catch (e) {
    console.error(e);
  }
}

export function getToken () {
  try {
    return AsyncStorage.getItem('spark_token');
  } catch (e) {
    console.error(e);
  }
}
