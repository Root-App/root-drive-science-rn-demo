package com.joinroot.drivesciencedemolibrary;

import android.support.annotation.Nullable;
import com.facebook.react.bridge.Callback;
import com.joinroot.roottriptracking.environment.IDriverTokenHandler;

public class DriverTokenHandler implements IDriverTokenHandler {
  private Callback callback;
  private String clientId;
  private String rootDriverToken;

  public DriverTokenHandler(
          String clientId,
          @Nullable String rootDriverToken,
          Callback callback
  ) {
    this.callback = callback;
    this.clientId = clientId;
    this.rootDriverToken = rootDriverToken;
  }

  @Override
  public String getClientId() {
    return this.clientId;
  }

  @Override
  public boolean hasDriverToken() {
    return rootDriverToken != null;
  }

  @Override
  public String getDriverToken() {
    return rootDriverToken;
  }

  @Override
  public void setDriverToken(String token) {
    callback.invoke(null, token);
    this.rootDriverToken = token;
  }

  @Override
  public void onFailure() {
     callback.invoke("Error");
  }
}
