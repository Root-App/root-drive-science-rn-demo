# Root Drive Science React Native Demo

This applicaiton is a demonstration of how to integerate a React Native
application with Root's Drive Science API for iOS and Android.

In order for the integration to work, you will need to add code to
the React part of your app, as well as add native code in the iOS and
Android parts of your app.

## Requirements

* This version of the Root SDK requires React Native 0.61.
* On iOS, we expect that you are using Xcode 11.2.x and building for
  iOS 10.0 and up.
* On Android TK...

## Installation

### Installation via Package Manager

In your applications `package.json` file, you need to add the bridge
library as a dependency and install it using your package manager.

```
"react-native-drive-science-demo-library": "<LOCATION TK>"
```

`$ npm install react-native-drive-science-demo-library --save`

### Mostly automatic installation

`$ react-native link react-native-drive-science-demo-library`

This library contains the API for interacting with the Root TripTracker library

### Manual iOS installation

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-drive-science-demo-library` and add `DriveScienceDemoLibrary.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libDriveScienceDemoLibrary.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

### Manual Android installato

## Setup

### IOS

For your React Native application to interact with our library, you need to do
the following:

Run `pod install` to load the dependent cocoapods defined by the demo library.

Set an `Environment` variable in the main `Info.plist`. This varable
what Root server the data will go to. Typically, you will use `staging` or
`production`.

Set a `ClientId` in the main `Info.plist`. The value for this will be provided
by Root.

In your `AppDelegate.m` file, import two libraries:

```
#import <react_native_drive_science_demo_library-Swift.h>
#import <CoreLocation/CLLocationManager.h>
```

In the same file, inside the `application didFinishLaunchingWithOptions:`
method, you need to request location authorization and initialize the
`DriveScienceLibrary`

```
if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusNotDetermined) {
  locationManager = [[CLLocationManager alloc] init];
  [locationManager requestAlwaysAuthorization];
}


DriveScienceDemoLibrary *library = [[DriveScienceDemoLibrary alloc] init];
[library initialize:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"ClientId"]
  environmentString:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"Environment"]];
```


### Android

In `MainApplication.java`, initialize the library like so:

```java
import com.joinroot.drivesciencedemolibrary.DriveScienceDemoLibraryModule;

  // further down, perhaps in `onCreate()`
  DriveScienceDemoLibraryModule.initialize(this, YOUR_DRIVE_SCIENCE_CLIENT_ID);
```

As with iOS, `YOUR_DRIVE_SCIENCE_CLIENT_ID` will be a ClientId provided by Root.

In `MainActivity.java`'s `onStart` method, request location permissions and to disable battery optimizations like so:

```java
@Override
protected void onStart() {
  super.onStart();
  ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 100);

  Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
  intent.setData(Uri.parse("package:" + this.getPackageName()));
  this.startActivityForResult(intent, 100, null);
}
```

### Common

## Usage


