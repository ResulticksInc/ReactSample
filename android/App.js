import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button, AsyncStorage } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Home from './Home';
import Profile from './Profile';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { identifier } from '@babel/types';

var screenName = '';
DeviceEventEmitter.addListener('resulticksNotification', (event) => {
	let appObj = new App();
	let customParam1 = JSON.parse(event.customParams);
	screenName = customParam1.screenName;
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOn: false,
			notifications: []
		};
	}
	componentWillMount() {
		console.log('APP Will Mount');
		this.enableListener();
	}
	componentDidMount() {
		if (screenName != '') {
			this.props.navigation.navigate(screenName);
		}
	}
	enableListener() {
		DeviceEventEmitter.addListener('resulticksNotification', (event) => {
			let customParam1 = JSON.parse(event.customParams);
			this.props.navigation.navigate(customParam1.screenName);
		});
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
