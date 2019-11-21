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

// 1. REIOSSDK login or register

RCT_EXPORT_METHOD(userRegister:(NSString *)userRegister) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[userRegister dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"User register data: %@",dict);
  [REiosHandler sdkRegistrationWithDictWithParams:dict];
}

// 2. REIOSSDK custom event

RCT_EXPORT_METHOD(customEvent:(NSString *)customEvent) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[customEvent dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Custom event data: %@",dict);
  
  NSDictionary *dataDict = dict[@"data"];
  
  NSString *dataStr = @"";
  NSError *error;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dataDict
                                                     options:NSJSONWritingPrettyPrinted // Pass 0 if you don't care about the readability of the generated string
                                                       error:&error];
  
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

RCT_EXPORT_METHOD(onNotificationPayloadReceiver:(NSString *)onNotificationPayloadReceiver state: (int)currentState) {
  
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[onNotificationPayloadReceiver dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  
  NSLog(@"\n\n **** Received notification from bridging file **** \n %@ \n **** \n\n",dict);
  
  NSDictionary *data = dict[@"_data"];
  NSDictionary *ios = dict[@"_ios"];
  
  NSString *category = @"";
  if([ios objectForKey:@"_category"]){
    category = ios[@"_category"];
  }
  NSString *sound = @"";
  if([dict objectForKey:@"_sound"]){
    sound = dict[@"_sound"];
  }
  NSString *badge = @"";
  if([ios objectForKey:@"_badge"]){
    badge = ios[@"_badge"];
  }
  NSString *actionIdentifier = @"";
  if([dict objectForKey:@"actionIdentifier"]){
    actionIdentifier = dict[@"actionIdentifier"];
  }
  NSString *screenUrl = @"";
  if([data objectForKey:@"screenUrl"]){
    screenUrl = data[@"screenUrl"];
  }
  NSString *_id = @"";
  if([data objectForKey:@"id"]){
    _id = data[@"id"];
  }
  NSString *_mobileFriendlyUrl = @"";
  if([data objectForKey:@"mobileFriendlyUrl"]){
    _mobileFriendlyUrl = data[@"mobileFriendlyUrl"];
  }
  NSString *_duration = @"";
  if([data objectForKey:@"duration"]){
    _duration = data[@"duration"];
  }
  NSString *_customParams = @"";
  if([data objectForKey:@"customParams"]){
    _customParams = data[@"customParams"];
  }
  NSString *_title = @"";
  if([dict objectForKey:@"_title"]){
    _title = dict[@"_title"];
  }
  NSString *_body = @"";
  if([dict objectForKey:@"_body"]){
    _body = dict[@"_body"];
  }
  NSString *_attachmentUrl = @"";
  if([data objectForKey:@"attachment-url"]){
    _attachmentUrl = data[@"attachment-url"];
  }
  
  id userInfo = @{
    @"data":@{
        @"screenUrl":screenUrl,
        @"id":_id,
        @"mobileFriendlyUrl":_mobileFriendlyUrl,
        @"duration":_duration,
        @"customParams": _customParams
    },
    @"aps":@{
        @"alert":@{
            @"title":_title,
            @"body":_body
        },
        @"category":category,
        @"badge":badge,
        @"mutable-content":@YES,
        @"sound":sound
    },
    @"attachmentUrl":_attachmentUrl,
    @"actionIdentifier":actionIdentifier
  };
  
  
  NSLog(@"\n\n **** Modified notification from bridging file **** \n %@ \n **** \n\n",userInfo);

  if (currentState == 1) {
    
    [[REiosHandler getNotification] setForegroundNotificationWithData:userInfo completionHandler:^(UNNotificationPresentationOptions options) {
      
      NSLog(@"options %lu", (unsigned long)options);
      
    }];
    
  } else if (currentState == 2) {
    [[REiosHandler getNotification] setNotificationActionWithResponse:userInfo];
    
  } else if (currentState == 3) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 7 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
      [[REiosHandler getNotification] setNotificationActionWithResponse:userInfo];
    });
    
  } else {
    NSLog(@"Unknown state");
  }
  
}


@end


