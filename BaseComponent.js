import React from 'react';
import { View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import Constants from './Constants';
import firebase from 'react-native-firebase';
export default class BaseComponent extends React.Component {
	constructor(props) {
		super(props);
		console.log('Base Constructor');
		if (Constants.getScreenName() != '') {
			console.log('Screen Name validation');
			this.props.navigation.navigate(Constants.getScreenName());
		}
	}
	componentDidMount() {}
	render() {
		return <View />;
	}
}
