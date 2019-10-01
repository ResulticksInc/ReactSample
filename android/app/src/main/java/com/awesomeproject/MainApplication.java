package com.awesomeproject;

import android.app.Application;

import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactApplication;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import java.util.Arrays;
import java.util.List;

import io.mob.resu.reandroidsdk.AppConstants;
import io.mob.resu.reandroidsdk.ReAndroidSDK;
import io.mob.resu.reandroidsdk.ReReactNativeSDKPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            AppConstants.LogFlag = true;
            return Arrays.<ReactPackage>asList(new MainReactPackage(),
             new FIRMessagingPackage(),
             new ReReactNativeSDKPackage());
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        ReAndroidSDK.getInstance(this);
        SoLoader.init(this, /* native exopackage */ false);
    }
}
