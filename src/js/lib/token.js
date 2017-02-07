import { AsyncStorage } from 'react-native';

export function storeToken (token) { // eslint-disable-line 
  try {
    AsyncStorage.setItem('spark_token', token);
  } catch (e) {
    console.error(e);
  }
}
