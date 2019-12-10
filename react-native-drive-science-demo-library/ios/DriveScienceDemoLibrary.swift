import Foundation
import RootTripTracker

@objc(DriveScienceDemoLibrary)
public class DriveScienceDemoLibrary: RCTEventEmitter {

    public override func supportedEvents() -> [String]! {
        return ["TripEvent", "TripError", "TripLog"]
    }

    @objc
    public static override func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    public func initialize(_ clientId: String, environmentString: String)
    {
        DriveScienceManager.sharedManager.setClient(
            clientId, environmentString: environmentString)
    }

    @objc
    public func initialize(_ clientId: String, environmentString: String,
                           resolver resolve: @escaping RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock)
    {
        DriveScienceManager.sharedManager.setClient(
            clientId, environmentString: environmentString)
    }

    @objc
    public func setToken(_ token: String?,
                         resolver resolve: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
        DriveScienceManager.sharedManager.setToken(
            token, resolver: resolve, rejecter: reject)
    }

    @objc
    public func activate(_ resolver: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
        DriveScienceManager.sharedManager.activate(
            resolver, rejecter: reject, eventEmitter: self)
    }

    @objc
    public func deactivate(_ resolver: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {
        DriveScienceManager.sharedManager.deactivate(resolver, rejecter: reject)
    }

}


