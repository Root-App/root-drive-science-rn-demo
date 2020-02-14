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

import java.util.HashMap;

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
    public void createDriver(String driverId, String email, String phone, final Promise promise) {
        RootTripTracking.ICreateDriverRequestHandler requestHandler = new RootTripTracking.ICreateDriverRequestHandler() {
            @Override
            public void onSuccess(String driverId) {
                promise.resolve(driverId);
            }

            @Override
            public void onFailure(String error) {
                promise.reject(error);
            }
        };

        RootTripTracking.getInstance().createDriver(driverId, email, phone, requestHandler);
    }

    @ReactMethod
    public void activate(String driverId, final Promise promise) {
        RootTripTracking.ITripTrackingActivateSuccessHandler requestHandler = new RootTripTracking.ITripTrackingActivateSuccessHandler() {
            @Override
            public void onSuccess() {
                promise.resolve("activated");
            }

            @Override
            public void onFailure(String error) {
                promise.reject(error);
            }
        };
        RootTripTracking.getInstance().activate(reactContext, driverId, requestHandler);

        startTripLifecycleHandler();
    }

    @ReactMethod
    public void configuredToAutoActivate(final Promise promise) {
        promise.resolve(RootTripTracking.getInstance().configuredToAutoActivate());
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
}

