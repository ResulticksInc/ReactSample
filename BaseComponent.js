import React from 'react';
import { View, Text,AsyncStorage } from 'react-native';

import { DeviceEventEmitter } from 'react-native';




export default class BaseComponent extends React.Component {
    
    constructor(props){
        super(props);
       // this.notify();
    }
    notify(){
        DeviceEventEmitter.addListener('resulticksNotification', (event) => {
            //this.props.navigation.navigate('Home');
            //if(this.props != undefined && this.props.navigation != undefined){
                 //   alert("Props");
                        
                        alert("Navigation 1 obj :" +this.props.navigation);
                        let customParam1 = JSON.parse(event.customParams);
                     //   alert("Received Screen Name" +customParam1.screenName);
                        this.props.navigation.navigate(customParam1.screenName);
            //}else{
             //   alert("Local")
            //	AsyncStorage.setItem("notify",JSON.stringify(event));
            //}
            
        });
    }
    componentWillMount(){
        console.log(" Will Mount : " );
        
    }
    componentDidMount(){
        console.log(" Did Mount : " );
        // DeviceEventEmitter.addListener('resulticksNotification', (event) => {
        //     //this.props.navigation.navigate('Home');
        //     //if(this.props != undefined && this.props.navigation != undefined){
        //          //   alert("Props");
        //                 alert("Props :" +this.props);
        //                 alert("Navigation :" +this.props.navigation);
        //                 let customParam1 = JSON.parse(event.customParams);
        //              //   alert("Received Screen Name" +customParam1.screenName);
        //                 this.props.navigation.navigate(customParam1.screenName);
        //     //}else{
        //      //   alert("Local")
        //     //	AsyncStorage.setItem("notify",JSON.stringify(event));
        //     //}
            
        // });

		// AsyncStorage.getItem("notify").then(result => {
		// 	if(result != undefined && result != ""){
		// 		let param = JSON.parse(result);
		// 		alert("Received" +param.customParams);
		// 		let customParam1 = JSON.parse(param.customParams);
		// 		alert("Received Screen Name" +customParam1.screenName);
		// 		this.props.navigation.navigate(customParam1.screenName);
		// 		// if(param.customParams.screenName == "Home"){
		// 		// 	console.log("Receive Notify" +JSON.stringify(result));
					
		// 		// }
		// 		// else if(param.customParams.screenName == "Profile"){
		// 		// 	//Page1
		// 		// 	this.props.navigation.navigate("Profile");
		// 		// }
				
		// 		AsyncStorage.setItem("notify","");
		// 	}
		// })
    }
    render(){
        <View></View>
    }
 
}