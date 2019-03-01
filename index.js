import { AppRegistry, YellowBox } from 'react-native';
import App from './src/js/index';

YellowBox.ignoreWarnings([
  'Setting a timer',
  'Require cycle',
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

AppRegistry.registerComponent('Spark', () => App);
