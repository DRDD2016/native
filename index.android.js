import { AppRegistry, YellowBox } from 'react-native';
import App from './src/js/index';

YellowBox.ignoreWarnings([
  'Setting a timer',
  'Require cycle:'
]);

AppRegistry.registerComponent('Spark', () => App);
