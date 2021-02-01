import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as NotificationService from './src/NotificationService';
import {presets} from './src/const';

AppRegistry.registerComponent(appName, () => App);
NotificationService.initialize(presets);
