/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Router from './Router';
import { name as appName } from './app.json';
import { DeviceEventEmitter } from 'react-native';

//import bgMessaging from './bgmessaging'; 



// DeviceEventEmitter.addListener('resulticksNotification', (event) => {
// 	//this.props.navigation.navigate('Home');
// 	if(this.props != undefined && this.props.navigation != undefined){
		
// 				let customParam1 = JSON.parse(event.customParams);
// 				alert("Received Screen Name" +customParam1.screenName);
// 				this.props.navigation.navigate(customParam1.screenName);
// 	}else{
// 		AsyncStorage.setItem("notify",JSON.stringify(event));
// 	}
	
// });

AppRegistry.registerComponent(appName, () => Router);

