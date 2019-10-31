import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import { DeviceEventEmitter } from 'react-native';
import Constants from './Constants';

var screenName = '';

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
