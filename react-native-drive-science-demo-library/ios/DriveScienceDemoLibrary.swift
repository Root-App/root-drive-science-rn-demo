import Foundation
import RootTripTracker

@objc(DriveScienceDemoLibrary)
class DriveScienceDemoLibrary: NSObject {

   @objc
   static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func initRootSdk(_ clientId: String, userApiKey: String?, environment: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    print("Got Here")
    callback([nil, "token"])
  }

}

