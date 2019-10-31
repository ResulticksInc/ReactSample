package com.awesomeproject;

import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.content.res.XmlResourceParser;

import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.json.JSONArray;
import org.json.JSONObject;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.mob.resu.reandroidsdk.AppConstants;
import io.mob.resu.reandroidsdk.ReAndroidSDK;
import io.mob.resu.reandroidsdk.ReReactNativeSDKPackage;
import io.mob.resu.reandroidsdk.error.Log;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            AppConstants.LogFlag = true;
            return Arrays.<ReactPackage>asList(new MainReactPackage(), new FIRMessagingPackage(),
                    new ReReactNativeSDKPackage(), new RNGestureHandlerPackage());
        }

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
        getAppDetails(this);
        SoLoader.init(this, /* native exopackage */ false);
    }

    public static JSONObject getAppDetails(final Context context) {

        JSONObject masterPage = new JSONObject();
        try {
            ArrayList<JSONObject> jsonObjects = new ArrayList<>();
            final AssetManager _am = context.createPackageContext(context.getPackageName(), 0).getAssets();
            final XmlResourceParser _xmlParser = _am.openXmlResourceParser(0, "AndroidManifest.xml");
            int _eventType = _xmlParser.getEventType();
            boolean isReceiver = false;
            boolean isMetadata = false;


            ArrayList<JSONObject> data = null;

            JSONObject jsonObject = null;

            while (_eventType != XmlPullParser.END_DOCUMENT) {

                if (_xmlParser.getName() != null) {
                    if ((_eventType == XmlPullParser.START_TAG) && _xmlParser.getName().equalsIgnoreCase("activity") || _xmlParser.getName().equalsIgnoreCase("data")) {
                        if (_xmlParser.getName().equalsIgnoreCase("activity")) {
                            if (jsonObject == null) {
                                jsonObject = new JSONObject();
                                data = new ArrayList<>();
                            } else {
                                if (!data.isEmpty()) {
                                    try {
                                        JSONObject object = data.get(0);
                                        String deepLinkUrl = "intent://" + object.getString("host") + "/#Intent;scheme=" + object.getString("scheme") + ";package=" + context.getPackageName();
                                        jsonObject.put("data", new JSONArray(data.toString()));
                                        jsonObject.put("isDeepLink", true);
                                        jsonObject.put("isDeepLinkUrl", deepLinkUrl);
                                    } catch (Exception e) {
                                        e.getMessage();
                                        jsonObject.put("isDeepLink", false);
                                    }
                                } else {
                                    jsonObject.put("isDeepLink", false);
                                }

                                if (jsonObject.has("activityName"))
                                    jsonObjects.add(jsonObject);


                                jsonObject = new JSONObject();
                                data = new ArrayList<>();
                            }

                            for (byte i = 0; i < _xmlParser.getAttributeCount(); i++) {


                                Log.e("Label", "" + _xmlParser.getAttributeName(i) + ":" + _xmlParser.getAttributeValue(i));

                                if (_xmlParser.getAttributeName(i).equalsIgnoreCase("name") && !_xmlParser.getAttributeValue(i).contains("com.google") && !_xmlParser.getAttributeValue(i).contains("com.facebook")) {
                                    String name = _xmlParser.getAttributeValue(i);
                                    String[] names = name.replace(".", ",").split(",");
                                    jsonObject.put("activityName", name);

                                    if (!jsonObject.has("displayName"))
                                        jsonObject.put("displayName", names[names.length - 1]);

                                    Log.e("name", "" + names[names.length - 1]);

                                }

                            }

                        } else if (_xmlParser.getName().equalsIgnoreCase("data")) {

                            JSONObject jsonObject1 = new JSONObject();

                            for (byte i = 0; i < _xmlParser.getAttributeCount(); i++) {
                                jsonObject1.put(_xmlParser.getAttributeName(i), _xmlParser.getAttributeValue(i));
                            }

                            if (jsonObject1.has("host"))
                                data.add(jsonObject1);

                        }
                    } else if ((_eventType == XmlPullParser.START_TAG) && _xmlParser.getName().equalsIgnoreCase("receiver")) {
                        for (byte i = 0; i < _xmlParser.getAttributeCount(); i++) {
                            if (_xmlParser.getAttributeName(i).equalsIgnoreCase("name") && _xmlParser.getAttributeValue(i).equalsIgnoreCase("io.mob.resu.reandroidsdk.InstallReferrerReceiver"))
                                isReceiver = true;
                        }
                    } else if ((_eventType == XmlPullParser.START_TAG) && _xmlParser.getName().equalsIgnoreCase("meta-data")) {
                        for (byte i = 0; i < _xmlParser.getAttributeCount(); i++) {
                            if (_xmlParser.getAttributeName(i).equalsIgnoreCase("name") && _xmlParser.getAttributeValue(i).equalsIgnoreCase("resulticks.key"))
                                isMetadata = true;
                        }
                    }
                }
                _eventType = _xmlParser.nextToken();
            }

            masterPage.put("screens", new JSONArray(jsonObjects.toString()));
            masterPage.put("isReceiver", isReceiver);
            masterPage.put("isMetadata", isMetadata);
            _xmlParser.close();
        } catch (final XmlPullParserException exception) {
            exception.printStackTrace();
        } catch (final PackageManager.NameNotFoundException exception) {
            exception.printStackTrace();
        } catch (final IOException exception) {
            exception.printStackTrace();
        } catch (final Exception exception) {
            exception.printStackTrace();
        }

        Log.e("Screens", masterPage.toString());
        return masterPage;
    }


}
