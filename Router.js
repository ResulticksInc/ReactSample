/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, AsyncStorage } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Home from './Home';
import Profile from './Profile';
import App from './App';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { identifier } from '@babel/types';

const AppNavigator = createStackNavigator({
	App: {
		screen: App
	},
	Home: {
		screen: Home
	},
	Profile: {
		screen: Profile
	}
});

export default createAppContainer(AppNavigator);
