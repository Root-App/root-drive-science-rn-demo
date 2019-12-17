//
//  DriveScienceManager.swift
//  DriveScienceDemoLibrary
//
//  Created by Noel Rappin on 11/12/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import RootTripTracker
import RootUtilities

public class DriveScienceManager {

    static let sharedManager = DriveScienceManager()

    var tripTracker: TripTracker?
    var ttdsManager: TripTrackerDriveScienceManager?
    var environment: RootTripTracker.EnvironmentType?
    var clientId: String?
    var ttdsManagerDelegate: DriveScienceManagerDelegate?
    var tripTrackerDelegate: DriveScienceTrackerDelegate?

    func setClient(_ clientId: String, environmentString: String) -> Bool {
        self.clientId = clientId
        self.environment = DriveScienceManager.stringToEnvironment(environmentString)
        self.ttdsManagerDelegate = DriveScienceManagerDelegate()
        self.tripTracker = TripTracker(environment: self.environment!)
        self.tripTrackerDelegate = DriveScienceTrackerDelegate()
        self.tripTracker!.delegate = self.tripTrackerDelegate
        self.ttdsManager = TripTrackerDriveScienceManager(
            clientId: clientId,
            tripTracker: self.tripTracker!,
            delegate: self.ttdsManagerDelegate!)
        guard let ttdsManager = self.ttdsManager else { return false }
        return true
    }

    func setToken(
        _ optionalToken: String?,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock)
    {
        guard let ttdsManager = self.ttdsManager else { return }
        guard let delegate = self.ttdsManagerDelegate else { return }
        delegate.resolve = resolve
        delegate.reject = reject
        guard let token = optionalToken else {
            ttdsManager.onboardWithoutToken()
            return
        }
        ttdsManager.onboardWithToken(token)
    }

    func activate(_ resolve: @escaping RCTPromiseResolveBlock,
                  rejecter reject: @escaping RCTPromiseRejectBlock,
                  eventEmitter: RCTEventEmitter)
    {
        guard let ttdsManager = self.ttdsManager else { return }
        guard let tripTrackerDelegate = self.tripTrackerDelegate else { return }
        tripTrackerDelegate.eventEmitter = eventEmitter
        let logDelegate = DriveScienceLogDelegate()
        logDelegate.eventEmitter = eventEmitter
        Log.addLogDelegate(logDelegate)
        ttdsManager.activate()
        resolve("Activated")
    }

    func deactivate(_ resolve: @escaping RCTPromiseResolveBlock,
                    rejecter reject: @escaping RCTPromiseRejectBlock) {
        guard let ttdsManager = self.ttdsManager else { return }
        ttdsManager.deactivate()
        resolve(true)
    }

    func shouldReactivate(_ resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock)
    {
        guard let ttdsManager = self.ttdsManager else {
            resolve([false])
            return
        }
        if(ttdsManager.shouldReactivate()) {
            resolve([true, ttdsManager.storedAccessToken!])
        } else {
            resolve([false])
        }

    }

    class func stringToEnvironment(_ environment: String) -> RootTripTracker.EnvironmentType {
        switch environment {
        case "local":
            return RootTripTracker.EnvironmentType.local
        case "staging":
            return RootTripTracker.EnvironmentType.staging
        case "testing":
            return RootTripTracker.EnvironmentType.testing
        default:
            return RootTripTracker.EnvironmentType.production
        }
    }

}

class DriveScienceManagerDelegate: TripTrackerDriveScienceManagerDelegate {
    public var resolve: RCTPromiseResolveBlock?
    public var reject: RCTPromiseRejectBlock?

    func didReceiveTelematicsToken(_ token: String) {
        guard let resolve = self.resolve else { return }
        resolve(token)
    }

    func didNotReceiveTelematicsToken(_ errorMessage: String) {
        guard let reject = self.reject else { return }
        reject(errorMessage, errorMessage, nil)
    }
}

class DriveScienceTrackerDelegate: TripTrackerDelegate {
    public var eventEmitter: RCTEventEmitter?

    func tripTracker(
        _ tripTracker: TripTracker,
        didTrackAnalyticsEvent eventName: String,
        withProperties properties: [String: Any])
    {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripEvent", body: eventName)
    }

    func tripTracker(
        _ tripTracker: TripTracker,
        didFailWithError error: TripTrackerError)
    {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripError", body: error)
    }
}

class DriveScienceLogDelegate: LogDelegate {
    public var eventEmitter: RCTEventEmitter?

    func infoLogged(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        // eventEmitter.sendEvent(withName: "TripLog", body: "Info " + message)
    }

    func debugLogged(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        // eventEmitter.sendEvent(withName: "TripLog", body: "Debug " + message)
    }

    func warningLogged(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripLog", body: "Warning " + message)
    }

    func errorLogged(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripLog", body: "Error " + message)
    }
}

