/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (!__DEV__) {
  global.console.log = () => {};
  global.console.warn = () => {};
  global.console.error = () => {};
}
AppRegistry.registerComponent(appName, () => App);
