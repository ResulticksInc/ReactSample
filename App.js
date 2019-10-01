/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button } from 'react-native';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOn: false,
			notifications: []
		};
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
		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {
			console.log(notifications[0]);
			var json = JSON.parse(notifications);
			this.setState({ notifications: json });
			alert(json[0]);
		});
	};

	deleteNotification = (position) => {
		NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(this.state.notifications[0]));
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}> Resulticks Sample APP!!</Text>
				<View style={{ marginTop: 10 }}>
					<Button onPress={this.register} title="User register" color="#FF6347" />
				</View>
				<View style={{ marginTop: 10 }}>
					<Button onPress={this.customEvent} title="Custom Events " color="#FF6347" />
				</View>
				<View style={{ marginTop: 10 }}>
					<Button onPress={this.userNavigation} title="User journey " color="#FF6347" />
				</View>
				<View style={{ marginTop: 10 }}>
					<Button onPress={this.userlocationUpdate} title="Locaction Update " color="#FF6347" />
				</View>
				<View style={{ marginTop: 10 }}>
					<Button onPress={this.getNotification} title="GetNotification " color="#FF6347" />
				</View>
				<View style={{ marginTop: 10 }}>
					<Button onPress={this.deleteNotification} title="DeleteNotification" color="#FF6347" />
				</View>
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
