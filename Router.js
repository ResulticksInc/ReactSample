/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, AsyncStorage, Platform } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Home from './Home';
import Profile from './Profile';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { identifier } from '@babel/types';
import BaseComponent from './BaseComponent';
import App from './App';
import firebase from 'react-native-firebase';
import RemoteMessage from 'react-native-firebase';
import Constants from './Constants';

// RST Android Notification user tap Payload Receiver
if (Platform.OS != 'ios') {
	DeviceEventEmitter.addListener('resulticksNotification', (event) => {
		let customParam = JSON.parse(event.customParams);
		Constants.setScreenName(customParam.screenName);
	});
}

const AppNavigator = createStackNavigator({
	App: {
		screen: App
	},
	Home: {
		screen: Home
	},
	Profile: {
		screen: Profile
	},

	Base: {
		screen: BaseComponent
	}
});

export default createAppContainer(AppNavigator);
