import React from 'react';
import { View, Text } from 'react-native';
import BaseComponent from './BaseComponent';


import { DeviceEventEmitter } from 'react-native';

export default class Profile extends React.Component {
    
  constructor(props){
    super(props);
    DeviceEventEmitter.addListener('resulticksNotification', (event) => {
    
      let customParam1 = JSON.parse(event.customParams);
      this.props.navigation.navigate(customParam1.screenName);
    });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}