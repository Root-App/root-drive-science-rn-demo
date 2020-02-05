import Foundation
import RootTripTracker

@objc(DriveScienceDemoLibrary)
public class DriveScienceDemoLibrary: RCTEventEmitter {

    public override func supportedEvents() -> [String]! {
        return ["TripStart", "TripEnd", "TripEvent", "TripError", "TripLog"]
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
    public func createDriver(_ driverId: String,
                            email: String,
                            phone: String,
                            resolver resolve: @escaping RCTPromiseResolveBlock,
                            rejecter reject: @escaping RCTPromiseRejectBlock) {
        DriveScienceManager.sharedManager.createDriver(
            driverId: driverId, email: email, phone: phone, resolver: resolve, rejecter: reject)
    }

    @objc
    public func activate(_ driverId: String,
                         resolver resolve: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
        DriveScienceManager.sharedManager.activate(driverId, resolver:
            resolve, rejecter: reject, eventEmitter: self)
    }

    @objc
    public func attachLog(_ level: String,
                          resolver resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
         DriveScienceManager.sharedManager.attachLog(
             level,  resolver: resolve, rejecter: reject, eventEmitter: self)
    }

    @objc
    public func deactivate(_ resolver: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {
        DriveScienceManager.sharedManager.deactivate(resolver, rejecter: reject)
    }

}


