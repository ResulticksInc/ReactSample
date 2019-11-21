/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button ,AsyncStorage,Platform} from 'react-native';

import { DeviceEventEmitter } from 'react-native';

import Home from './Home'
import Profile from './Profile'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { identifier } from '@babel/types';
import BaseComponent from './BaseComponent';

import App from './App';

import Constants from './Constants'


import firebase from 'react-native-firebase';

import RemoteMessage  from 'react-native-firebase';


// firebase.onNotificationOpen().subscribe(async (data) => {

// 	alert("Notification Open");
// 	if (data.tap) {// when user tapped the background notification

// 	} else { // Received in foreground

// 	}
//   });





var screenName = "";

// DeviceEventEmitter.addListener('resulticksNotification', (event) => {

// 	let customParam1 = JSON.parse(event.customParams);
// 	//appObj.callEvent(customParam1.screenName);
// 	screenName = customParam1.screenName;

// 	console.log("Router :" +screenName);
// 	Constants.setScreenName(screenName);



// });




// const AppNavigator = createStackNaigator({
// 	Home: {screen:Home},
//   });


// const AppContainer = createAppContainer(AppNavigator);
// var screenName = "";


// // EventEmitter.addListener('resulticksNotification',(event) => {

// // })

if(Platform.OS != "ios"){
	DeviceEventEmitter.addListener('resulticksNotification', (event) => {
		let appObj = new App();
		let customParam1 = JSON.parse(event.customParams);
		//appObj.callEvent(customParam1.screenName);
		screenName = customParam1.screenName;
		//addObj.componentDidMount();
		//appObj.notify()

		//   alert("Received Screen Name" +);


	});
}





function getActiveRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	if (route.routes) {
    console.log(`active routes ${getacti(route)}`);
		return getActiveRouteName(route);
	}
	return route.routeName;
}



const AppNavigator = createStackNavigator({

	App: {
	  screen: App,
	},
	Home:{
		screen:Home,
	},
	Profile:{
		screen:Profile,
	},
	Base:{
		screen:BaseComponent,
	},

  });

  export default createAppContainer(AppNavigator);
