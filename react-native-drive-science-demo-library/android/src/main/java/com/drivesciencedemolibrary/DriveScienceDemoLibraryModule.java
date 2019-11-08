package com.joinroot.drivesciencedemolibrary;

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

    @ReactMethod
    public void initRootSDK(
        String clientId,
        String userApiKey,
        String environment,
        Callback callback
    ) {
        RootTripTracking.getInstance().initialize(
            this.getReactApplicationContext(),
            new DriverTokenHandler(clientId, userApiKey, callback),
            PRODUCTION.equals(environment) ? Environment.PRODUCTION : Environment.STAGING
        );
    }
}
