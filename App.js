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

	state = {
		isShowList: false,
		notificationList: []
	}

	componentDidMount() {
		// FCM token Reciever
		firebase.messaging().getToken().then((fcmToken) => {
			if (fcmToken) {
				console.log(`\n\n **** FCM Token **** \n ${fcmToken} \n **** End \n\n`);
				var resUser = {
					uniqueId: 'BZ003728',
					name: 'John',
					email: 'john@gmail.com',
					phone: '9123123123',
					age: '30',
					gender: 'Male',
					profileUrl: 'https://john_profile_pic.png',
					dob: "29Sep1990",
					education: "PG",
					employed: true,
					married: true,
					token: fcmToken
				};
				NativeModules.ReReactNativeSDK.userRegister(JSON.stringify(resUser));
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

				// Note:
				// AlertMaybeLater and Dismiss are Resulticks category
				// if defaultActionIdentifier {
				// 	// navigate your screen
				// }
				// if (actionIdentifier == "AlertMaybeLater" || actionIdentifier == "Dismiss") {
				// 	// do not navigate screen 0r do not navigate your screen when app in background
				// }
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
			// this.props.navigation.navigate(customParam.screenName);
			/*******/
		});
	}

	/* Resulticks Android Notification Handler */
	resAndroidNotificationHandler() {
		if (Platform.OS != 'ios') {
			DeviceEventEmitter.addListener('resulticksNotification', (payload) => {
				let customParam = JSON.parse(payload.customParams);
				// this.props.navigation.navigate(customParam.screenName);
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
			uniqueId: 'BZ003728',
			name: 'John',
			email: 'john@gmail.com',
			phone: '9123123123',
			age: '30',
			gender: 'Male',
			profileUrl: 'https://john_profile_pic.png',
			dob: "29Sep1990",
			education: "PG",
			employed: true,
			married: true,
			token: 'device-token'
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
			data: {}
		};
		NativeModules.ReReactNativeSDK.customEvent(JSON.stringify(customEventObject));
	};

	// Screen tracking: Developer must pass screen name according to the presented screen
	userNavigation = () => {
		this.props.navigation.navigate("Profile");
		NativeModules.ReReactNativeSDK.screenNavigation('HomeScreen');
	};

	// Location update: Developer must pass(Live or required location) the location object with latitude and longitude key as a String format
	userlocationUpdate = () => {
		var location = {
			lat: 13.27070000000001,
			long: 80.27070000000001
		};
		NativeModules.ReReactNativeSDK.locationUpdate(JSON.stringify(location));
	};

	// Get notification list: Developer need to call this method to get notification list.
	getNotification = () => {
		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {
			let notificationList = [];

			if (Platform.OS != 'ios') {
				notificationList = JSON.parse(notifications);
			} else {
				notificationList = notifications;
			}
			if (notificationList.length !== 0) {
				// Do your functionality
				let jsonString = JSON.stringify(notificationList)
				alert(`*** the count is ${notificationList.length} \n\n ${JSON.stringify(JSON.parse(jsonString),null,2)}`)
			} else {
				alert("There are no notifications")
			}
		});
	};

	// Delete notification: Developer must pass selected notification object to delete
	deleteNotification = (position) => {

		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {

			let notificationList = [];

			if (Platform.OS != 'ios') {
				notificationList = JSON.parse(notifications);
			} else {
				notificationList = notifications;
			}
			if (notificationList.length > 0) {
				NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(notificationList[0]));
			} else {
				alert("There are no notifications")
			}
		});
	};

	goToNotificationInbox = () => {

		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {

			alert("Green day")

			this.setState({ isShowList: true })

			let notificationList = [];

			if (Platform.OS != 'ios') {
				if (notifications.length > 0) {
					this.setState({ notificationList: notifications })
				}
			}
		});
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
				<Button onPress={this.goToNotificationInbox} title="Go to notification inbox" color="#FF6347" />
				{
					this.state.notificationList.length > 0 && this.state.isShowList ?

					<View style={container.list}>
					<Button onPress = {() => this.setState({ isShowList: false})} />
					{
						this.state.notificationList.map((item, index) => {
							return <Text>{index}</Text>
							})
					}
					</View> : null
				}
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
	},
	list: {
		backgroundColor: "red",
		margin: 0,
		height: 400,
		width: 200,
		flex: 1,
		display: "flex"
	}
});
