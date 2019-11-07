import Foundation
import RootTripTracker

@objc(RootSdk)

@objcMembers
class RootSdk: NSObject {

  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  func initRootSdk() {

  }

}
