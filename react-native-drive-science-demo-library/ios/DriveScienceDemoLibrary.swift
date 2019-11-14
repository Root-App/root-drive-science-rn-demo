import Foundation
import RootTripTracker

@objc(DriveScienceDemoLibrary)
public class DriveScienceDemoLibrary: NSObject {

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    public func initDriveScienceManager(_ clientId: String, environmentString: String) {
        DriveScienceManager.sharedManager.setClient(clientId, environmentString: environmentString)
    }

    @objc
    public func activate(_ token: String?,
        tokenCallback: @escaping RCTResponseSenderBlock,
        trackerCallback: @escaping RCTResponseSenderBlock) {
        DriveScienceManager.sharedManager.activate(
            token,
            tokenCallback: tokenCallback,
            trackerCallback: trackerCallback)
    }

    @objc
    public func deactivate() {
        DriveScienceManager.sharedManager.deactivate()
    }


}


