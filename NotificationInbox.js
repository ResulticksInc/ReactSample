// import React from 'react';
// import BaseComponent from './BaseComponent';
// import { StyleSheet, Text, View, NativeModules, Button, Platform } from 'react-native';
//
// export default class NotificationInbox extends BaseComponent {
//
// 	state = {
// 		list: []
// 	}
// 	constructor(props) {
// 		super(props);
// 	}
// 	componentDidMount() {
// 		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {
//
// 			let notificationList = [];
//
// 			if (Platform.OS != 'ios') {
// 				notificationList = JSON.parse(notifications);
// 			} else {
// 				notificationList = notifications;
// 			}
// 			if (notificationList.length !== 0) {
// 				// Do your functionality
// 				this.setState({
// 					list: notificationList
// 				})
// 				// alert(JSON.stringify(notificationList))
// 			} else {
// 				alert("There are no notifications")
// 			}
// 		});
// 	}
// 	render() {
// 		return (
// 			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 				{
// 					this.state.list((item, index) => {
// 						return <View>
// 							<Text>item.title</Text>
// 						</View>
// 					})
// 				}
// 			</View>
// 		);
// 	}
// }
