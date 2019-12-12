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
* On Android TK

## Setup

### General

In your applicaitions `package.json` file, you need to add the bridge
library as a dependency:

```
"react-native-drive-science-demo-library": "<LOCATION TK>"
```



### IOS

`Environment` and `ClientId` are set in the [Info.plist](./DriveScienceDemo/ios/DriveScienceDemo/Info.plist) file.
Allowed `Environment` values are: `local, testing, staging, production`.

### Android
cd
