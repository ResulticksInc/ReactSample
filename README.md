# ReactSample

	register = () => {
		var resUser = {
			uniqueId: 'xxxxx@xxxx.com',
			name: 'xxxxxxx',
			age: '58',
			email: 'yyyyyy@xxxx.com',
			phone: 'xxxxxxxxxx',
			gender: 'xxxxxx',
			token:'FCM OR GCM Token',
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
  
  
         getNotification = () => {
		NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {
			var json = JSON.parse(notifications);
			this.setState({ notifications: json });
		});
	};

	deleteNotification = (position) => {
		NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(this.state.notifications[position]));
	};

