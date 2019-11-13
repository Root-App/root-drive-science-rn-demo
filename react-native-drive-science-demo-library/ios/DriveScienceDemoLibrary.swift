import Foundation
import RootTripTracker

@objc(DriveScienceDemoLibrary)
class DriveScienceDemoLibrary: NSObject {

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    func initDriveScienceManager(_ clientId: String, environmentString: String) {
        DriveScienceManager.sharedManager.setClient(clientId, environmentString: environmentString)
    }

    @objc
    func activate(_ token: String?,
        tokenCallback: @escaping RCTResponseSenderBlock,
        trackerCallback: @escaping RCTResponseSenderBlock) {
        DriveScienceManager.sharedManager.activate(
            token,
            tokenCallback: tokenCallback,
            trackerCallback: trackerCallback)
    }

    @objc
    func deactivate() {
        DriveScienceManager.sharedManager.deactivate()
    }


}


