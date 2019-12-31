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
* On Android we expect that you are building for Android 5.0
  (Lollipop) and up.

## Installation

### Installation via Package Manager

The Drive Science SDK for React native consists of an NPM package that contains
code to allow the React Native code to interact with Root's trip tracking
libraries. You need to install the NPM package as a dependency and allow it to
install its depenencies.

### Mostly automatic installation

`$ npm install react-native-drive-science-demo-library --save`

(or `yarn install` if you are using yarn)

`$ react-native link react-native-drive-science-demo-library`

### Less automatic installation

In your application's `package.json` file, you need to add the bridge
library as a dependency and install it using your package manager.

```
"react-native-drive-science-demo-library": "<LOCATION TK>"
```

Than `npn install` or `yarn install`

### Manual iOS installation

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-drive-science-demo-library` and add `DriveScienceDemoLibrary.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libDriveScienceDemoLibrary.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

### Manual Android installation

## Setup

### IOS

For your React Native application to interact with our library, you need to do
the following:

Run `pod install` to load the dependent cocoapods defined by the demo library.

In your `AppDelegate.m` file, import two libraries:

```
#import <react_native_drive_science_demo_library-Swift.h>
#import <CoreLocation/CLLocationManager.h>
```

In the same file, inside the `application didFinishLaunchingWithOptions:`
method, you need to request location authorization and initialize the
`DriveScienceLibrary`.

You need two pieces of information for this, the environment and the client ID.
We recommend setting them in the `Info.plist` file.

Set a variable named `Environment` in the main `Info.plist`. This varable
what Root server the data will go to. Typically, you will use `staging` or
`production`.

Set a variable named  `ClientId` in the main `Info.plist`. The value for this
will be provided by Root.

Then the following snippet will request location authorization and use the
`Info.plist` values to initialize the Drive Science Library.

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

In `MainApplication.java`, import and initialize the library like so:

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

You should also add these permissions to your `AppManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />
```

### Common

## Usage in React

To import any of the Drive Science methods, use this

```
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"
```

To start tracking, call the `setToken` method with a `null` argument. The
resulting promise will resolve with a DriveScienceToken:

```
const returnedToken = await DriveScienceLibrary.setToken(null)
```

If you want to persist the connection between the user of your app and the
Root Drive Science data, you should save this token, and on subsequent
application start-ups, call `setToken` with the token as an argument.

After the token is set, you can start tracking with a call to `activate`:

```
const eventMessage = await DriveScienceLibrary.activate()
```

A successful resoution to the Promise means that tracking has begun.

You can optionally start logging:

```
await DriveScienceLibrary.attachLog(logLevel)
```

Where `logLevel` is one of `debug`, `info`, `warning`, or `error`.

To stop tracking, call `deactivate`:

```
await DriveScienceLibrary.deactivate()
```

If the application crashes or stops with tracking still on, when the
application is restarted, tracking will automatically resume in the background.

You can check for this occurance by calling `shouldReactivate` when the
application starts, and before you try to send a token or activate the tracker.

```
const [
        shouldReactivate,
        token,
      ] = await DriveScienceLibrary.shouldReactivate()
```

If the application has automatically reactivated, the first value in the return
array will be `true` and the second value will be the token being used for
tracking. If the application has not reactivated, the first value will be
`false` and the second value will be `null`.



