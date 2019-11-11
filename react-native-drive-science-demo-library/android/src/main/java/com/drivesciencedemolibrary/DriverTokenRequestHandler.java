package com.drivesciencedemolibrary;

import com.facebook.react.bridge.Callback;
import com.joinroot.roottriptracking.RootTripTracking;

public class DriverTokenRequestHandler implements RootTripTracking.IDriverTokenRequestHandler {

    private Callback callback;

    public DriverTokenRequestHandler(Callback callback) {
        this.callback = callback;
    }

    @Override
    public void onSuccess(String token) {
        callback.invoke(null, token);
    }

    @Override
    public void onFailure() {
        callback.invoke("Error");
    }
}
