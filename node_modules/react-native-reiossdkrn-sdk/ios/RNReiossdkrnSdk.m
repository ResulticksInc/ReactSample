
#import "RNReiossdkrnSdk.h"
#import <REIOSSDK/REIOSSDK.h>
#import <UserNotifications/UserNotifications.h>

@implementation RNReiossdkrnSdk

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

// 1. REIOSSDK login register

RCT_EXPORT_METHOD(userRegister:(NSString *)userRegister) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[userRegister dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);
  [REiosHandler sdkRegistrationWithDictWithParams:dict];
}

// 2. REIOSSDK custom event

RCT_EXPORT_METHOD(customEvent:(NSString *)customEvent) {
  NSError *err = nil;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[customEvent dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:&err];
  NSLog(@"Dict is %@",dict);

  [REiosHandler addEventWithEventName:@"name" data:dict];
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

  [REiosHandler updateLocationWithLat:dict[@"lat"] long:dict[@"lat"]];
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
  
  [[REiosHandler getNotification] setNotificationActionWithResponse:@{}];
}




@end




@end
  
