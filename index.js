/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Router from './Router';
import { name as appName } from './app.json';
import { DeviceEventEmitter } from 'react-native';

AppRegistry.registerComponent(appName, () => Router);
