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
    public void getDriverToken(Callback callback) {
        DriverTokenRequestHandler handler = new DriverTokenRequestHandler(callback);
        RootTripTracking.getInstance().getDriverToken(reactContext, handler);
    }

    @ReactMethod
    public void setDriverToken(String token) {
        RootTripTracking.getInstance().setDriverToken(reactContext, token);
    }
}