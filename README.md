# Root Drive Science React Native Demo

This application is a demonstration of how to integrate a React Native
application with Root's Drive Science SDK for iOS and Android.

For full information on how to integrate your system please see the
integration docs at <https://github.com/Root-App/drive-science-docs>

## Requirements

* This version of the Root SDK requires React Native 0.61.
* On iOS, we expect that you are using Xcode 11.3.x and building for
  iOS 10.0 and up.
* On Android we expect that you are building for Android 5.0
  (Lollipop) and up.

## Running the App

Install the following (assuming macOS)

* node (`brew install node`)
* yarn (`brew install yarn`)
* watchman (`brew install watchman`)

### iOS

#### Prerequisites

Ensure that the following are installed on your macOS system:

* Xcode 11.3.x
  (Install via the Mac App Store or using <https://github.com/RobotsAndPencils/xcodes>)
* Cocoapods
  (`sudo gem install cocoapods` if you are using the Apple system Ruby,
  if you have installed your own Ruby version, probably just
  `gem install coocapods`)

Within Xcode:

* Ensure the Xcode command line tools are installed by opening Xcode, heading
  to "Preferences", going to the "Locations" panel and selecting the most
  recent version of the command line tools.
* In the same "Preferences" panel, go to "Components", and select a simulator.

From the command line of the project directory

* `$ cd DriveScienceDemo`
* `$ yarn install`
* `$ cd ios && pod install && cd ..`
* `$ react-native run-ios`

The app should load in a simulator (the first build will take a few minutes).

You can specify a different simulator device with the `--simulator` flag, as
in `react-native run-ios --simulator="iPhone X"`.

You can open the app in Xcode by opening the file
`DriveScienceDemo/ios/DriveScienceDemo.xcworkspace`

If you want to run the app on a physical device, check out the instructions at
<https://facebook.github.io/react-native/docs/running-on-device>.

### Android

This assumes macOS, for other operating systems, see
<https://facebook.github.io/react-native/docs/getting-started>.

* Install a JDK 8 or newer. The react native docs recommend
  `brew tap AdoptOpenJDK/openjdk && brew cask install adoptopenjdk8`

Instructions on setting up Android Studio can be found at
<https://facebook.github.io/react-native/docs/getting-started>

* `$ cd DriveScienceDemo`
* `$ yarn install`
* `$ react-native run-android`

## Using the App

Pressing the "Start Tracking" button will contact a (non-production) Root
server and start tracking keyed to this device. Pressing "Stop Tracking" will
end the tracking. A few events will be logged to the screen. The "copy log"
button copies those logs to the system clipboard for diagnostic purposes.
