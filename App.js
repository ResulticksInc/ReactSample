/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button , Platform} from 'react-native';

import { DeviceEventEmitter } from 'react-native';

import BaseComponent from './BaseComponent';

if(Platform.OS == "ios"){
	firebase.notifications().onNotification((notification) => {

		console.log("Foreground Notifications");
		const { title, body } = notification
		var cache = []

		const action = notification.action;
		console.log("Action" +action);
		notification.actionIdentifier = action;

		var newValue = JSON.stringify(notification, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});

		cache = null;


		console.log("New Value : " + typeof(newValue));

		let strObject = JSON.parse(newValue)
		console.log("New Value strObject: " + typeof(strObject));

		let dataObject = strObject["_data"]

		console.log("New data : " + JSON.stringify(strObject._notificationId));
		// console.log("notification id : " + dataObject["_notificationId"]);


		const notification1 = new firebase.notifications.Notification()
		.setBody(strObject["_body"])
		.setData(dataObject)
		  .setNotificationId(JSON.stringify(strObject._notificationId))
		.setTitle(strObject["_title"])

		console.log("**** Notification1 ***** \n\n", notification1)

	  firebase.notifications()
	  .displayNotification(notification1)


		//NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(newValue);
	})


	firebase.notifications().getInitialNotification(notificationOpen => {
		if (notificationOpen) {
			//let value = JSON.parse(notificationOpen);
			console.log("Opened from closed app" + notificationOpen.notification.data.attachment - url);
			alert("Opened from closed app" + notificationOpen);
		}
		else {
			alert("Not opened from closed app")
		}
	});

	firebase.notifications().onNotificationOpened(notifyOpened => {

		alert("Notification Tap Event 2" +notifyOpened);
		const notification = notifyOpened.notification;
		//alert(JSON.stringify(notifyOpened.notification.data));
		const action = notifyOpened.action;
		console.log("Action" +action);
		notification.actionIdentifier = action;

		var cache = []
		var newValue = JSON.stringify(notification, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});

		cache = null;

		console.log("New Value : " +newValue);
		NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(newValue);

	})
}



export default class App extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			isOn: false,
			notifications: []
		};
	}
  // Component willMount is deprecated react-native 0.60
	componentWillMount() {
		console.log('APP Will Mount');
		this.notify();
	}

	componentWillUnmount() {
		Console.log('App Will Un Mount');
	}
  async componentDidMount() {
		firebase.messaging().getToken().then(fcmToken => {
			if (fcmToken) {
				console.log("FCM Token" + fcmToken);

			}
		});

		// Register a callback to forward the Firebase token to Engage in case it gets refreshd
		firebase.messaging().onTokenRefresh((fcmToken) => {
			// alert(fcmToken)
			console.log(fcmToken);
			this.setState({ fcmToken })
		})

	}
	notify() {
    if(Platform.OS != "ios"){
      DeviceEventEmitter.addListener('resulticksNotification', (event) => {
  			let customParam1 = JSON.parse(event.customParams);
  			this.props.navigation.navigate(customParam1.screenName);
  		});
    }

	}

	register = () => {
		var resUser = {
			uniqueId: 'buvanesh@gmail.com',
			name: 'buvanesh',
			age: '58',
			email: 'buvanesh@gmail.com',
			phone: '9786483047',
			gender: 'male',
			token:
				'ftBTbiSgYdU:APA91bFuoBDx0o8MlD-aKfJRvmQszZ0_NLNPHplVCF91fQYRIqp2SXWqteWDg_qa5YzQAcQ71NjNj_rfqXa7Woq2decTlN81sZXopLO5nkwgsNlQVChW866DoONt27bKtA2QQGCOxNKn',
			profileUrl: ''
		};

		NativeModules.ReReactNativeSDK.userRegister(JSON.stringify(resUser));
	};

	customEvent = () => {
		// Event type 1
		var resEvent1 = {
			eventName: 'App Opened'
		};
		// Event type 2
		var resEvent2 = {
			eventName: 'Product Purchased',
			data: {
				productId: 'P234234',
				productName: 'Mobile Phone'
			}
		};
		NativeModules.ReReactNativeSDK.customEvent(JSON.stringify(resEvent2));
	};

	userNavigation = () => {
		NativeModules.ReReactNativeSDK.screenNavigation('HomeScreen');
	};

	userlocationUpdate = () => {
		var location = {
			latitude: 13.067439,
			longitude: 80.237617
		};
		NativeModules.ReReactNativeSDK.locationUpdate(JSON.stringify(location));
	};

	getNotification = () => {
		console.log('Welcome Buvanesgh');
		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {
			console.log(notifications[0]);
			var json = JSON.parse(notifications);
			this.setState({
				notifications: json
			});
			alert(json[0]);
		});
	};

	deleteNotification = (position) => {
		NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(this.state.notifications[0]));
	};

	render() {
		//return <AppContainer />;
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	}
});
