import React from 'react';
import { View, Text } from 'react-native';
import BaseComponent from './BaseComponent';

export default class Home extends BaseComponent{
    constructor(props){
        super(props);
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}