/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, Button,Platform } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import BaseComponent from './BaseComponent';
import firebase, { notifications } from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';


export default class App extends BaseComponent {

  componentWillMount() {
    this.notify();
  }
  componentDidMount() {

    firebase.messaging().getToken().then(fcmToken => {
      if (fcmToken) { console.log(`\n\n **** FCM Token **** \n ${fcmToken} \n **** End \n\n`) }
      })

      if(Platform.OS == "ios") {

        // Foreground notification - iOS
        firebase.notifications().onNotification((notification) => {

          const { title, body } = notification

          // Removing circular object and converting to string - Start
          var cache = []
          var newValue = JSON.stringify(notification, function(key, value) {
            if (typeof value === 'object' && value !== null) {
              if (cache.indexOf(value) !== -1) { return }
              cache.push(value);
            }
            return value;
            })
            cache = null
            // Removing circular object and converting to string - End

            console.log(`\n\n **** Foreground Notification - App.js **** \n ${JSON.stringify(newValue)} \n **** End \n\n`)

            // Checking notification value exist and passing value
            if(newValue) { NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(newValue, 1) }

            })

            // Background notification - iOS
            firebase.notifications().onNotificationOpened(notifyOpened => {

              const notification = notifyOpened.notification;
              const action = notifyOpened.action;
              notification.actionIdentifier = action;

              // Removing circular object and converting to string - Start
              var cache = []
              var newValue = JSON.stringify(notification, function(key, value) {
                if (typeof value === 'object' && value !== null) {
                  if (cache.indexOf(value) !== -1) { return }
                  cache.push(value);
                }
                return value;
                });
                cache = null
                // Removing circular object and converting to string - End

                console.log(`\n\n **** Background Notification - App.js **** \n ${JSON.stringify(newValue)} \n **** End \n\n`)

                NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(newValue, 2);

                })

                // Notification received when app open for the first time or from closed state - iOS
                firebase.notifications().getInitialNotification()
                .then((notificationOpen) => {
                  if (notificationOpen) {
                    const notification = notificationOpen.notification;
                    const action = notificationOpen.action;
                    notification.actionIdentifier = action;

                    // Removing circular object and converting to string - Start
                    var cache = []
                    var newValue = JSON.stringify(notification, function(key, value) {
                      if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                          return;
                        }
                        cache.push(value);
                      }
                      return value;
                      });
                      cache = null;
                      // Removing circular object and converting to string - End

                      console.log(`\n\n **** First launch or App closed state Notification - App.js **** \n ${JSON.stringify(newValue)} \n **** End \n\n`)
                      NativeModules.ReReactNativeSDK.onNotificationPayloadReceiver(newValue, 3)
                    }
                    });
                  }
                }


                componentWillUnmount() {
                  this.removeNotificationDisplayedListener();
                  this.removeNotificationListener();
                }


                notify() {
                  if(Platform.OS != "ios"){
                    DeviceEventEmitter.addListener('resulticksNotification', (event) => {
                      let customParam1 = JSON.parse(event.customParams);
                      this.props.navigation.navigate(customParam1.screenName);

                      });
                    }
                  }

                  register = () => {
                    var resUser = {
                      uniqueId: 'user-email or mobile number',
                      name: 'user-name',
                      age: 'user-age',
                      email: 'user-email',
                      phone: 'mobile-number',
                      gender: 'user-gender',
                      token:"device-token",
                      profileUrl: 'user-profile-url'
                    };

                    console.log("Register App.js" + resUser);

                    NativeModules.ReReactNativeSDK.userRegister(JSON.stringify(resUser));
                  };

                  customEvent = () => {

                    // Sending custom event
                    // Custom event : event name and data both fully customizable for the user wish
                    var customEventObject = {
                      eventName: 'Your custom event name',
                      data: {
                        productId: 'Your product id',
                        productName: 'Your product name'
                      }
                    };
                    NativeModules.ReReactNativeSDK.customEvent(JSON.stringify(customEventObject));
                  };


                  // Screen tracking: Developer must pass screen name according to the presented screen
                  userNavigation = () => {
                    NativeModules.ReReactNativeSDK.screenNavigation('HomeScreen');
                  };

                  // Location update: Developer must pass(Live or required location) the location object with latitude and longitude key as a String format
                  userlocationUpdate = () => {
                    var location = {
                      latitude: 13.067439,
                      longitude: 80.237617
                    };
                    NativeModules.ReReactNativeSDK.locationUpdate(JSON.stringify(location));
                  };

                  // Get notification list: Developer need to call this method to get notification list.
                  getNotification = () => {
                    NativeModules.ReReactNativeSDK.getNotification((error, notifications) => {

                      console.log(`getting notification type: ${typeof(notifications)}`);
                      console.log(`getting notification: ${JSON.stringify(notifications)}`);

                      let notificationList = JSON.stringify(notifications)

                      if(notificationList.length !== 0) {
                        alert(notificationList)
                      }

                      });
                    };

                    // Delete notification: Developer must pass selected notification object to delete
                    deleteNotification = (position) => {

                      let noteObj = { campaignId: "0001" }
                      NativeModules.ReReactNativeSDK.deleteNotification(JSON.stringify(noteObj))


                       // => {
                       //  if(notification != undefined && notification.length > 0){
                       //    alert("Notification Delete");
                       //    }else{
                       //      alert("No Notification");
                       //    }
                       //    });
                        };

                        render() {

                          //return <AppContainer />;
                          return (
                            <View style={styles.container}>
                            <Text style={styles.welcome}> Welcome to Resulticks App!! </Text>
                            <Button onPress={this.register} title="register" color="#FF6347" />
                            <Button onPress={this.customEvent} title="customEvent" color="#FF6347" />
                            <Button onPress={this.userNavigation} title="screenStart" color="#FF6347" />
                            <Button onPress={this.userlocationUpdate} title="Locaction Update" color="#FF6347" />
                            <Button onPress={this.getNotification} title="getNotification" color="#FF6347" />
                            <Button onPress={this.deleteNotification} title="deleteNotification" color="#FF6347" />
                            </View>
                            );
                          }
                        }

                        function getActiveRouteName(navigationState) {
                          if (!navigationState) {
                            return null;
                          }
                          const route = navigationState.routes[navigationState.index];
                          if (route.routes) {
                            return getActiveRouteName(route);
                          }
                          return route.routeName;
                        }

                        const styles = StyleSheet.create({
                          container: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F5FCFF'
                          }
                          });
