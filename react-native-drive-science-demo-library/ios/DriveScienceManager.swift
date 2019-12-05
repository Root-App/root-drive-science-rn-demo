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
    var onboarder: TripTrackerOnboarder?
    var environment: RootTripTracker.EnvironmentType?
    var clientId: String?
    var onboarderDelegate: DriveScienceManagerDelegate?
    var tripTrackerDelegate: DriveScienceTrackerDelegate?
    public var isActive: Bool

    init() {
        self.isActive = false
    }

    func setClient(_ clientId: String, environmentString: String) -> Bool {
        self.clientId = clientId
        self.environment = DriveScienceManager.stringToEnvironment(environmentString)
        self.onboarderDelegate = DriveScienceManagerDelegate()
        self.tripTracker = TripTracker(environment: self.environment!)
        self.tripTrackerDelegate = DriveScienceTrackerDelegate()
        self.tripTracker!.delegate = self.tripTrackerDelegate
        self.onboarder = TripTrackerOnboarder(
            clientId: clientId,
            tripTracker: self.tripTracker!,
            delegate: self.onboarderDelegate!)
        if let hasOnboarder = onboarder {
            return true
        } else {
            return false
        }
    }

    func setToken(
        _ optionalToken: String?,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock)
    {
        guard let onboarder = self.onboarder else { return }
        guard let delegate = self.onboarderDelegate else { return }
        delegate.resolve = resolve
        delegate.reject = reject
        guard let token = optionalToken else {
            onboarder.onboardWithoutToken()
            return
        }
        onboarder.onboardWithToken(token)
    }

    func activate(_ resolve: @escaping RCTPromiseResolveBlock,
                  rejecter reject: @escaping RCTPromiseRejectBlock,
                  eventEmitter: RCTEventEmitter)
    {
        guard let tripTracker = self.tripTracker else { return }
        guard let tripTrackerDelegate = self.tripTrackerDelegate else { return }
        tripTrackerDelegate.eventEmitter = eventEmitter
        let logDelegate = DriveScienceLogDelegate()
        logDelegate.eventEmitter = eventEmitter
        Log.addLogDelegate(logDelegate)
        tripTracker.activate()
        resolve("Activated")
        self.isActive = true
    }

    func deactivate(_ resolve: @escaping RCTPromiseResolveBlock,
                    rejecter reject: @escaping RCTPromiseRejectBlock) {
        guard let tripTracker = self.tripTracker else { return }
        tripTracker.deactivate()
        self.isActive = false
        resolve(true)
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

class DriveScienceManagerDelegate: TripTrackerOnboarderDelegate {
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
        print("trip event to delegate")
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripEvent", body: eventName)
    }

    func tripTracker(
        _ tripTracker: TripTracker,
        didFailWithError error: TripTrackerError)
    {
        print("trip error to delegate")
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripError", body: error)
    }
}

class DriveScienceLogDelegate: LogDelegate {
    public var eventEmitter: RCTEventEmitter?

    func infoLogged(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripLog", body: "Info " + message)
    }

    func debugLogged(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripLog", body: "Debug " + message)
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

