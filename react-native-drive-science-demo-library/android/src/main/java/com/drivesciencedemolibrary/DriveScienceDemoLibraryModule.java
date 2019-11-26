package com.joinroot.drivesciencedemolibrary;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.joinroot.roottriptracking.RootTripTracking;
import com.joinroot.roottriptracking.environment.Environment;

public class DriveScienceDemoLibraryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private static final String STAGING = "staging";
    private static final String PRODUCTION = "production";

    public DriveScienceDemoLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DriveScienceDemoLibrary";
    }

    public static void initialize(Context context, String clientId) {
        RootTripTracking.getInstance().initialize(context, clientId, Environment.STAGING);
    }

    @ReactMethod
    public void activate(Callback callback) {
        RootTripTracking.getInstance().activate(reactContext);
    }

    @ReactMethod
    public void deactivate() {
        RootTripTracking.getInstance().deactivate(reactContext);
    }

    @ReactMethod
    public void isActive(Callback callback) {
        boolean active = RootTripTracking.getInstance().isActive();
        callback.invoke(active);
    }

    @ReactMethod
    public void getCurrentAccessToken(Callback callback) {
        String token = RootTripTracking.getInstance().getCurrentAccessToken();
        callback.invoke(token);
    }

    private void getNewAndSetAccessToken() {
        RootTripTracking.getInstance().getNewAndSetAccessToken();
    }

    @ReactMethod
    public void setToken(String token) {
        if (token != null) {
            RootTripTracking.getInstance().setAccessToken(token);
        } else {
            getNewAndSetAccessToken();
        }
    }
}