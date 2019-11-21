import React from 'react';
import { View, Text,AsyncStorage } from 'react-native';

import { DeviceEventEmitter } from 'react-native';
import Constants from './Constants';

import firebase from 'react-native-firebase';



//import Router from  './Router';

var screenName = "";

// DeviceEventEmitter.addListener('resulticksNotification', (event) => {
	
// 	let customParam1 = JSON.parse(event.customParams);
// 	//appObj.callEvent(customParam1.screenName);
//     screenName = customParam1.screenName;
    
//     console.log("Base Constructor Global");
// 	//addObj.componentDidMount();
// 	//appObj.notify()
	
// 	//   alert("Received Screen Name" +);
	   
	
// });


export default class BaseComponent extends React.Component {
    
    constructor(props){
        super(props);
        console.log("Base Constructor" );
        if(Constants.getScreenName() != ""){
            console.log("Screen Name validation" );
            this.props.navigation.navigate(Constants.getScreenName());
        }
        
    }
    componentDidMount(){
    }
    render(){
        return(
            <View></View>
        )
       
    }
 
}