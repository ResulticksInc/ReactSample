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

@implementation ReReactNativeSDK

RCT_EXPORT_MODULE();

// 1. REIOSSDK login register

RCT_EXPORT_METHOD(userRegister:(NSString *)userRegister) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[userRegister dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  [[NSNotificationCenter defaultCenter] addObserver:self
         selector:@selector(receiveTestNotification:)
         name:@"RCTContentDidAppearNotification"
         object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
          selector:@selector(receiveTestNotification:)
          name:@"RCTOpenURLNotification"
          object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
          selector:@selector(receiveTestNotification:)
          name:@"FIRAppDiagnosticsNotification"
          object:nil];
  [REiosHandler sdkRegistrationWithDictWithParams:dict];
}


- (void) receiveTestNotification:(NSNotification *) notification
{
    // [notification name] should always be @"TestNotification"
    // unless you use this method for observation of other notifications
    // as well.
    NSLog(@"Notification Receive %@",notification);
    if ([[notification name] isEqualToString:@"TestNotification"])
        NSLog (@"Successfully received the test notification!");
}
// 2. REIOSSDK custom event

RCT_EXPORT_METHOD(customEvent:(NSString *)customEvent) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[customEvent dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  
  NSDictionary *dataDict = dict[@"data"];
  
  NSString *dataStr = @"";
  NSError *error;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dataDict
  options:NSJSONWritingPrettyPrinted // Pass 0 if you don't care about the readability of the generated string
    error:&error];
  
//
//     // NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self
//                                                    options:(NSJSONWritingOptions)    (testDict ? NSJSONWritingPrettyPrinted : 0)
//                                                      error:&error];

      if (! jsonData) {
         NSLog(@"%s: error: %@", __func__, error.localizedDescription);
        
      } else {
        dataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
      }
  
  

  [REiosHandler addEventWithEventName:dict[@"eventName"] data:dataStr];
}

// 3. REIOSSDK user navigation

RCT_EXPORT_METHOD(screenNavigation:(NSString *)screenNavigation) {
  [REiosHandler setScreenNameWithScreenName:screenNavigation];
}

// 4. REIOSSDK user notification

RCT_EXPORT_METHOD(locationUpdate:(NSString *)locationUpdate) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[locationUpdate dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  
  NSString *latStr = [NSString stringWithFormat:@"%@",dict[@"latitude"]];
   NSString *longStr = [NSString stringWithFormat:@"%@",dict[@"longitude"]];

  [REiosHandler updateLocationWithLat:latStr long:longStr];
}

RCT_EXPORT_METHOD(getNotification:(RCTResponseSenderBlock)callback) {
  callback(@[[NSNull null], [REiosHandler getNotificationList]]);
}

RCT_EXPORT_METHOD(deleteNotification:(NSString *)deleteNotification) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[deleteNotification dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  
  [REiosHandler deleteNotificationListWithDict:dict];
}

RCT_EXPORT_METHOD(onNotificationPayloadReceiver:(NSString *)onNotificationPayloadReceiver) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[onNotificationPayloadReceiver dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  NSDictionary *data = dict[@"_data"];
  NSDictionary *ios = dict[@"_ios"];
  NSString *sound = @"";
  if([dict objectForKey:@"_sound"]){
    sound = dict[@"_sound"];
  }
  id userInfo = @{
    @"data":@{
        @"screenUrl":data[@"screenUrl"],
        @"id":data[@"id"],
        @"mobileFriendlyUrl":data[@"mobileFriendlyUrl"],
        @"duration":data[@"duration"]
    },
    @"aps":@{
        @"alert":@{
            @"title":dict[@"_title"],
            @"body":dict[@"_body"]
        },
        @"category":ios[@"_category"],
        @"badge":ios[@"_badge"],
        @"mutable-content":@YES,
        @"sound":sound,
        
    },
    @"attachmentUrl":data[@"attachment-url"],
    @"actionIdentifier":dict[@"actionIdentifier"]
  };
  NSLog(@" User Info %@" , userInfo);
  
  [[REiosHandler getNotification] setNotificationActionWithResponse:userInfo];
}






@end


