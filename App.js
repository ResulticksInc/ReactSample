/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, Platform } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import BaseComponent from './BaseComponent';
import firebase, { notifications } from 'react-native-firebase';

export default class App extends BaseComponent {
	componentDidMount() {
		// FCM token Reciever
		firebase.messaging().getToken().then((fcmToken) => {
			if (fcmToken) {
				console.log(`\n\n **** FCM Token **** \n ${fcmToken} \n **** End \n\n`);
			}
		});
		/* Resulticks Push Handler */
		if (Platform.OS == 'ios') {
			this.resIosNotificationHandler();
		} else {
			this.resAndroidNotificationHandler();
		}
	}

	componentWillUnmount() {
		this.removeNotificationDisplayedListener();
		this.removeNotificationListener();
	}

	/* Resulticks Ios Notification Handler */
	resIosNotificationHandler() {
		// Foreground notification - iOS
		firebase.notifications().onNotification((obj) => {
			if (obj) {
				obj.actionIdentifier = obj.action;
				var resPayload = this.payloadConversion(obj);
				if (resPayload) {
					NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(JSON.stringify(resPayload), 1);
				}

				// Local Notification optional one
				const local_notification = new firebase.notifications.Notification()
					.setBody(resPayload._body)
					.setData(resPayload._data)
					.setNotificationId(resPayload._notificationId)
					.setTitle(resPayload._title);
				firebase.notifications().displayNotification(local_notification);
				// Do your functionality

				/*******/
			}
		});

		// Notification Open - iOS
		firebase.notifications().onNotificationOpened((obj) => {
			if (obj) {
				var notificationObject = obj.notification;
				notificationObject.actionIdentifier = obj.action;
				var resPayload = this.payloadConversion(notificationObject);
				if (resPayload) {
					NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(JSON.stringify(resPayload), 2);
				}
				console.log('Payload Receiver Opened' + resPayload);
				// Do your functionality
				let customParam = JSON.parse(resPayload._data.customParams);
				this.props.navigation.navigate(customParam.screenName);
				/*******/
			}
		});

		// Notification received when app open for the first time or from closed state - iOS
		firebase.notifications().getInitialNotification().then((obj) => {
			if (obj) {
				var notificationObject = obj.notification;
				notificationObject.actionIdentifier = obj.action;
				var resPayload = this.payloadConversion(notificationObject);
				if (resPayload) {
					NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(JSON.stringify(resPayload), 3);
				}
			}
			console.log('App first time Opened' + resPayload);
			// Do your functionality
			let customParam = JSON.parse(resPayload._data.customParams);
			this.props.navigation.navigate(customParam.screenName);
			/*******/
		});
	}

	/* Resulticks Android Notification Handler */
	resAndroidNotificationHandler() {
		if (Platform.OS != 'ios') {
			DeviceEventEmitter.addListener('resulticksNotification', (payload) => {
				let customParam = JSON.parse(payload.customParams);
				this.props.navigation.navigate(customParam.screenName);
			});
		}
	}

	/* Notification payload conversion */
	payloadConversion(notfication) {
		var cache = [];
		var payload = JSON.stringify(notfication, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					return;
				}
				cache.push(value);
			}
			return value;
		});
		cache = null;
		return JSON.parse(payload);
	}

	/* User Register */
	register = () => {
		var resUser = {
			uniqueId: 'user-email or mobile number',
			name: 'user-name',
			age: 'user-age',
			email: 'user-email',
			phone: 'mobile-number',
			gender: 'user-gender',
			token: 'device-token',
			profileUrl: 'user-profile-url'
		};

		console.log('Register App.js' + resUser);

		NativeModules.ReReactNativeSDK.userRegister(JSON.stringify(resUser));
	};

	/* Custom Event */
	customEvent = () => {
		// Sending custom event
		// Custom event : event name and data both fully customizable for the user wish
		var customEventObject = {
			eventName: 'Your custom event name',
			data: {
				productId: 'Your product id',
				productName: 'Your product name'
			}
		};
		NativeModules.ReReactNativeSDK.customEvent(JSON.stringify(customEventObject));
	};

	// Screen tracking: Developer must pass screen name according to the presented screen
	userNavigation = () => {
		NativeModules.ReReactNativeSDK.screenNavigation('HomeScreen');
	};

	// Location update: Developer must pass(Live or required location) the location object with latitude and longitude key as a String format
	userlocationUpdate = () => {
		var location = {
			latitude: 13.067439,
			longitude: 80.237617
		};
		NativeModules.ReReactNativeSDK.locationUpdate(JSON.stringify(location));
	};

	// Get notification list: Developer need to call this method to get notification list.
	getNotification = () => {
		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {
			console.log(`getting notification type: ${typeof notifications}`);
			console.log(`getting notification: ${JSON.stringify(notifications)}`);
			let notificationList = JSON.stringify(notifications);
			if (notificationList.length !== 0) {
				// Do your functionality
			}
		});
	};

	// Delete notification: Developer must pass selected notification object to delete
	deleteNotification = (position) => {
		let noteObj = { campaignId: '0001' };
		NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(noteObj));
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}> Welcome to Resulticks App!! </Text>
				<Button onPress={this.register} title="register" color="#FF6347" />
				<Button onPress={this.customEvent} title="customEvent" color="#FF6347" />
				<Button onPress={this.userNavigation} title="screenStart" color="#FF6347" />
				<Button onPress={this.userlocationUpdate} title="Locaction Update" color="#FF6347" />
				<Button onPress={this.getNotification} title="getNotification" color="#FF6347" />
				<Button onPress={this.deleteNotification} title="deleteNotification" color="#FF6347" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	}
});
