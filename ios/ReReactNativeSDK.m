//
//  ReReactNativeSDK.m
//  MyApp
//
//  Created by Sivakumar on 8/8/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <REIOSSDK/REIOSSDK.h>
#import "ReReactNativeSDK.h"
#import <UserNotifications/UserNotifications.h>
#import <UIKit/UIKit.h>

@implementation ReReactNativeSDK

RCT_EXPORT_MODULE();

//MARK:- User registration

RCT_EXPORT_METHOD(userRegister:(NSString *)userRegister) {
  [REiosHandler registerUserData:userRegister];
}

//MARK:- Custom event

RCT_EXPORT_METHOD(customEvent:(NSString *)customEvent) {
  [REiosHandler addCustomEvent:customEvent];
}

//MARK:- Screen tracking

RCT_EXPORT_METHOD(screenNavigation:(NSString *)screenNavigation) {
  [REiosHandler setScreenName:screenNavigation];
}

//MARK:- Location update

RCT_EXPORT_METHOD(locationUpdate:(NSString *)locationUpdate) {
  [REiosHandler updateWithLocation:locationUpdate];
}

//MARK:- Get notification list

RCT_EXPORT_METHOD(getNotification:(RCTResponseSenderBlock)callback) {
  
  [REiosHandler getNotificationListWithSuccessHandler:^(NSArray* notificationList) {
    NSLog(@"Dict is %@",notificationList);
    callback(@[[NSNull null], notificationList]);
  }];
}

//MARK:- Delete notification from notification list

RCT_EXPORT_METHOD(deleteNotification:(NSString *)deleteNotification) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[deleteNotification dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  
  [REiosHandler deleteNotificationListWithDict:dict];
//  [REiosHandler deleteNotificationByCampaignIdWithCampaignId:@"SS12"];
  
}

//MARK:- Pass notification data to SDK

RCT_EXPORT_METHOD(onNotificationPayloadReceiver:(NSString *)onNotificationPayloadReceiver state: (int)currentState) {
    
  if (currentState == 1) {

    [REiosHandler setForegroundNotification:onNotificationPayloadReceiver completionHandler:^(UNNotificationPresentationOptions options) {
      NSLog(@"options %lu", (unsigned long)options);
    }];

  } else if (currentState == 2) {
    [REiosHandler setNotificationActionWithStrResponse:onNotificationPayloadReceiver];

  } else if (currentState == 3) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 7 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
      [REiosHandler setNotificationActionWithStrResponse:onNotificationPayloadReceiver];
    });

  } else {
    NSLog(@"Unknown state");
  }
}


@end


