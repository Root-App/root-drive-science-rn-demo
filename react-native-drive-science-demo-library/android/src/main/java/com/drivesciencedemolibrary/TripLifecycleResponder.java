package com.joinroot.drivesciencedemolibrary;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.joinroot.roottriptracking.RootTripTracking;
import com.joinroot.roottriptracking.environment.Environment;
import com.joinroot.roottriptracking.lifecycle.ITripTrackerLifecycleHandler;
import com.joinroot.roottriptracking.lifecycle.LifecycleEvent;
import com.joinroot.roottriptracking.lifecycle.TripEvent;

import java.util.HashMap;

public class TripLifecycleResponder implements ITripTrackerLifecycleHandler {
    @Override
    public void onEvent(LifecycleEvent event) {
      switch (event.getName()) {
        case ACTIVATION:
          // TODO Implement
          break;
        case TRIP_STARTED:
          // TODO Implement                
          break;
        case TRIP_CANCELED:
          // TODO Implement
          break;
        case TRIP_ENDED:
          // TODO Implement
          break;
        case TRIP_UPLOAD_STARTED:
          // TODO Implement
          break;
        case TRIP_UPLOAD_RETRYING:
          // TODO Implement
          break;
        case TRIP_UPLOAD_SUCCEEDED:
          // TODO Implement
          break;
        case TRIP_UPLOAD_FAILED:
          // TODO Implement
          break;
        case TRIP_UPLOAD_FAILED_EXCEPTION:
          // TODO Implement
          break;          
        case DEACTIVATION:
          // TODO Implement
          break;
      }
    }
  }