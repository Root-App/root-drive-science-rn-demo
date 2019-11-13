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
    func activate(_ token: String?, callback: @escaping RCTResponseSenderBlock) {
        DriveScienceManager.sharedManager.activate(token, callback: callback)
    }
    
    @objc
    func deactivate() {
        DriveScienceManager.sharedManager.deactivate()
    }
    

}


