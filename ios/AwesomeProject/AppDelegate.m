/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <REIOSSDK/REIOSSDK.h>
#import <UserNotifications/UserNotifications.h>

#import <Firebase.h>

#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"



@implementation AppDelegate

 


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
   [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(sendDataMessageFailure:) name:@"TestNotification" object:nil];
  
  [self registerNotificationForFcm:application];
  [FIRApp configure];
  [[FIRMessaging messaging]setDelegate:self];

  
  
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendDataMessageFailure:) name:@"application:didRegisterForRemoteNotificationsWithDeviceToken:" object:nil];

  
  
  
  NSLog(@"Resulticks SDK INIT");
  
 
  
   [self initReiossdk];
  
//  [REiosHandler enablePrintAnyWithEnable: YES];
    
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"AwesomeProject"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  //[[UIApplication sharedApplication]setDelegate:self];
  

  return YES;
}

- (void)sendDataMessageFailure:(NSNotification *)notification {
  NSDictionary *userInfo = notification.object;
  
  
}


- (void)registerNotificationForFcm:(UIApplication *)application {
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
   // [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    [[UNUserNotificationCenter currentNotificationCenter]setDelegate:self];
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
        UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    [[UNUserNotificationCenter currentNotificationCenter]
        requestAuthorizationWithOptions:authOptions
        completionHandler:^(BOOL granted, NSError * _Nullable error) {
          // ...
        }];
  } else {
    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
  }

  [application registerForRemoteNotifications];
}

- (void)initReiossdk {
  
//  UNNotificationAction *acceptAction = [UNNotificationAction actionWithIdentifier:@"accept"
//                                                                            title:@"Save"
//                                                                          options:UNNotificationActionOptionForeground];
//  UNNotificationAction *declineAction = [UNNotificationAction actionWithIdentifier:@"decline"
//                                                                             title:@"Decline"
//                                                                           options:UNNotificationActionOptionDestructive];
//  UNNotificationAction *snoozeAction = [UNNotificationAction actionWithIdentifier:@"snooze"
//                                                                            title:@"Snooze"
//                                                                          options:UNNotificationActionOptionDestructive];
//  NSArray *notificationActions = @[ acceptAction, declineAction, snoozeAction ];
//
//  // create a category
//  UNNotificationCategory *inviteCategory = [UNNotificationCategory categoryWithIdentifier:@"CYLInviteCategoryIdentifier" actions:notificationActions intentIdentifiers:@[] options:UNNotificationCategoryOptionNone];
//  NSSet *categories = [NSSet setWithObject:inviteCategory];
  
  
 [REiosHandler initWithApiWithApiKey:@"Resulticks_APIKey" registerNotificationCategory: NULL];
  //[REiosHandler initWithApiWithApiKey:@"8d05fb54-637a-452a-9afe-1cf2d44cd2ba" registerNotificationCategory: categories];
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken{
  NSLog(@"FCM Token AppDelegate : %@",fcmToken);
}
//- (void)messaging:(FIRMessaging *)messaging didReceiveMessage:(FIRMessagingRemoteMessage *)remoteMessage{
//  NSLog(@"Receive Message");
//}
//- (void) receiveTestNotification:(NSNotification *) notification {
//
//    NSDictionary *userInfo = notification.userInfo;
//   // MyObject *myObject = [userInfo objectForKey:@"someKey"];
//}
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
//   NSLog(@"Resposnse");
//}
//
// -(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
//  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
//}
//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
//  NSLog(@"Will Present");
//}
//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center openSettingsForNotification:(nullable UNNotification *)notification{
//
//  NSLog(@"Open Settings");
//
//}



//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
//                                                       fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
//  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary* )userInfo {
//  // If you are receiving a notification message while your app is in the background,
//  // this callback will not be fired till the user taps on the notification launching the application.
//  // TODO: Handle data of notification
//
//  // With swizzling disabled you must let Messaging know about the message, for Analytics
//  // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
//
//  // Print message ID.
////  if (userInfo[kGCMMessageIDKey]) {
////    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
////  }
//
//  // Print full message.
//  NSLog(@"%@", userInfo);
//}



//- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
//  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
//}




- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
