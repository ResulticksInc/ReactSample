//
//  AppDelegateCategory.m
//  AwesomeProject
//
//  Created by Rajaram on 11/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AppDelegateCategory.h"
#import <UserNotifications/UserNotifications.h>
#import <UIKit/UIKit.h>
#import <objc/runtime.h>


static NSString *kUserNotificationDidReceiveResponseSelectorString =
@"userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:";


@implementation AppDelegateCategory
-(void)initMethod{
  SEL didReceiveNotificationResponseSelector =
         NSSelectorFromString(kUserNotificationDidReceiveResponseSelectorString);
  
  SEL swizzledSelector = @selector(userNotificationCenter:didReceiveNotificationResponseNew:withCompletionHandler:);
          
  Method defaultMethod = class_getInstanceMethod([self class], didReceiveNotificationResponseSelector);
  Method swizzledMethod = class_getInstanceMethod([self class], swizzledSelector);
  BOOL isMethodExists = !class_addMethod([self class], didReceiveNotificationResponseSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
}


- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponseNew:(UNNotificationResponse *)response
  withCompletionHandler:(void (^)())completionHandler
   {
//     NSLog( @"Handle push from background or closed" );
//     // if you set a member variable in didReceiveRemoteNotification, you  will know if this is from closed or background
//     NSLog(@"%@", response.notification.request.content.userInfo);
    }

-(void)impleMethod{
  
}
@end
