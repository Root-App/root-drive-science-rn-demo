import Foundation
import RootTripTracker

@objc(DriveScienceDemoLibrary)
public class DriveScienceDemoLibrary: NSObject {

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    public func initialize(_ clientId: String, environmentString: String) {
        DriveScienceManager.sharedManager.setClient(clientId, environmentString: environmentString)
    }
    
    @objc
    public func setToken(_ token: String?,
                         tokenCallback: @escaping RCTResponseSenderBlock) {
        DriveScienceManager.sharedManager.setToken(token, tokenCallback: tokenCallback)
    }

    @objc
    public func activate(_ trackerCallback: @escaping RCTResponseSenderBlock) {
        DriveScienceManager.sharedManager.activate(trackerCallback)
    }

    @objc
    public func deactivate() {
        DriveScienceManager.sharedManager.deactivate()
    }
    
    @objc
    public func isActive() -> Bool {
        return DriveScienceManager.sharedManager.isActive
    }


}


