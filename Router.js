/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, AsyncStorage,Platform } from 'react-native';

import { DeviceEventEmitter } from 'react-native';

import Home from './Home';
import Profile from './Profile';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { identifier } from '@babel/types';
import BaseComponent from './BaseComponent';

import App from './App';

import Constants from './Constants';

var screenName = '';
if(Platform.OS != "ios"){
  DeviceEventEmitter.addListener('resulticksNotification', (event) => {
  	let customParam1 = JSON.parse(event.customParams);
  	screenName = customParam1.screenName;
  	console.log('Router :' + screenName);
  	Constants.setScreenName(screenName);
  });
}


function getActiveRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	if (route.routes) {
		return getActiveRouteName(route);
	}
	return route.routeName;
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
