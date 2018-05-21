package com.opensettings;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.dfm.vstartup.BuildConfig;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by dfm-engineering on 4/25/18.
 */

public class OpenSettingsModule extends ReactContextBaseJavaModule {

    public OpenSettingsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OpenSettings";
    }
    @ReactMethod
    public void openNetworkSettings(Callback cb) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            cb.invoke(false);
            return;
        }
        try {
            currentActivity.startActivity(new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + BuildConfig.APPLICATION_ID)));;
            cb.invoke(true);
        } catch (Exception e) {
            cb.invoke(e.getMessage());
        }
    }
}
