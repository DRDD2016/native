import { AsyncStorage } from 'react-native';

export default function storeToken (token) {
  try {
    AsyncStorage.setItem('spark_token', token);
  } catch (e) {
    console.error(e);
  }
}
