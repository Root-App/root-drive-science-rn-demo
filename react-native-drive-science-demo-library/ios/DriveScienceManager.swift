//
//  DriveScienceManager.swift
//  DriveScienceDemoLibrary
//
//  Created by Noel Rappin on 11/12/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import RootTripTracker

class DriveScienceManager {

    static let sharedManager = DriveScienceManager()

    var tripTracker: TripTracker?
    var onboarder: TripTrackerOnboarder?
    var environment: RootTripTracker.EnvironmentType?
    var clientId: String?
    var onboarderDelegate: DriveScienceManagerDelegate?
    var tripTrackerDelegate: DriveScienceTrackerDelegate?

    func setClient(_ clientId: String, environmentString: String) {
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
    }

    func activate(
        _ optionalToken: String?,
        tokenCallback: @escaping RCTResponseSenderBlock,
        trackerCallback: @escaping RCTResponseSenderBlock)
    {
        guard let onboarder = self.onboarder else { return }
        guard let delegate = self.onboarderDelegate else { return }
        guard let tripTrackerDelegate = self.tripTrackerDelegate else { return }
        delegate.callback = tokenCallback
        tripTrackerDelegate.callback = trackerCallback
        guard let token = optionalToken else {
            onboarder.onboardWithoutToken()
            return
        }
        onboarder.onboardWithToken(token)
    }

    func deactivate() {
        guard let tripTracker = self.tripTracker else { return }
        tripTracker.deactivate()
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
    public var callback: RCTResponseSenderBlock?

    func didReceiveTelematicsToken(_ token: String) {
        guard let callback = self.callback else { return }
        callback([true, token, ""])
    }

    func didNotReceiveTelematicsToken(_ errorMessage: String) {
        guard let callback = self.callback else { return }
        callback([false, "", errorMessage])
    }
}

class DriveScienceTrackerDelegate: TripTrackerDelegate {
    public var callback: RCTResponseSenderBlock?

    func tripTracker(
        _ tripTracker: TripTracker,
        didTrackAnalyticsEvent eventName: String,
        withProperties properties: [String: Any])
    {
        guard let callback = self.callback else { return }
        callback([true, eventName])
    }

    func tripTracker(
        _ tripTracker: TripTracker,
        didFailWithError error: TripTrackerError)
    {
        guard let callback = self.callback else { return }
        callback([false, error])
    }
}

