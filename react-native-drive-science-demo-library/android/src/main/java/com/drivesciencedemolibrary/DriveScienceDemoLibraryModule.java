package com.joinroot.drivesciencedemolibrary;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.joinroot.roottriptracking.services.ITripLifecycleHandler;
import com.joinroot.roottriptracking.RootTripTracking;
import com.joinroot.roottriptracking.environment.Environment;

public class DriveScienceDemoLibraryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private ITripLifecycleHandler tripHandler;

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

    private void startTripLifecycleHandler() {
        ITripLifecycleHandler handler = new ITripLifecycleHandler() {
            @Override
            public void onTripStarted(String tripId) {
                reactContext.getJSModule(
                    DeviceEventManagerModule.RCTDeviceEventEmitter.class
                ).emit(
                    "TripStart",
                    tripId
                );
            }

            @Override
            public void onTripEnded(String tripId) {
                reactContext.getJSModule(
                    DeviceEventManagerModule.RCTDeviceEventEmitter.class
                ).emit(
                    "TripEnd",
                    tripId
                );
            }
        };

        RootTripTracking.getInstance().setTripLifecycleHandler(handler);
    }

    @ReactMethod
    public void activate(Promise promise) {
        startTripLifecycleHandler();
        RootTripTracking.getInstance().activate(reactContext);
        promise.resolve("started");
    }

    @ReactMethod
    public void deactivate(Promise promise) {
        RootTripTracking.getInstance().deactivate(reactContext);
        promise.resolve("stopped");
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

    @ReactMethod
    public void attachLog(String level, Promise promise) {
        // TODO: add logging if we don't want this to be a no-op
    }

    @ReactMethod
    public void shouldReactivate(Promise promise) {
        boolean shouldReactivate = RootTripTracking.getInstance().shouldReactivate();

        WritableArray arr = Arguments.createArray();

        arr.pushBoolean(shouldReactivate);
        if (shouldReactivate) {
            String token = RootTripTracking.getInstance().getCurrentAccessToken();
            arr.pushString(token);
        }
        promise.resolve(arr);
    }
}

