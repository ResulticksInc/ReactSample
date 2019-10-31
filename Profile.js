import React from 'react';
import { View, Text } from 'react-native';
import BaseComponent from './BaseComponent';

export default class Profile extends BaseComponent{
    
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}