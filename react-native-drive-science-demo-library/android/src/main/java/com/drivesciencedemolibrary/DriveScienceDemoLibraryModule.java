package com.joinroot.drivesciencedemolibrary;

import android.content.Context;

import com.facebook.react.bridge.Promise;
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
    public void activate(Promise promise) {
        RootTripTracking.getInstance().activate(reactContext);
        promise.resolve("started");
    }

    @ReactMethod
    public void deactivate(Promise promise) {
        RootTripTracking.getInstance().deactivate(reactContext);
        promise.resolve("stopped");
    }

    @ReactMethod
    public void isActive(Promise promise) {
        boolean active = RootTripTracking.getInstance().isActive();
        promise.resolve(active);
    }

    private void getNewAndSetAccessToken(final Promise promise) {
        RootTripTracking.getInstance().generateAccessToken(new RootTripTracking.IDriverTokenRequestHandler() {
            @Override
            public void onSuccess(String token) {
                RootTripTracking.getInstance().setAccessToken(token);
                promise.resolve(token);
            }

            @Override
            public void onFailure() {
            }
        });
    }

    @ReactMethod
    public void setToken(String token, Promise promise) {
        if (token != null) {
            RootTripTracking.getInstance().setAccessToken(token);
            promise.resolve(token);
        } else {
            getNewAndSetAccessToken(promise);
        }
    }
}