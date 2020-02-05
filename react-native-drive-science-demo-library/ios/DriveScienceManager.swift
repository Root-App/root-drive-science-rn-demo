//
//  DriveScienceManager.swift
//  DriveScienceDemoLibrary
//
//  Created by Noel Rappin on 11/12/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import RootTripTracker

public class DriveScienceManager {

    static let sharedManager = DriveScienceManager()

    var tripTracker: TripTracker?
    var ttdsManager: TripTrackerDriveScienceManager?
    var environment: RootTripTracker.EnvironmentType?
    var clientId: String?
    var ttdsManagerDelegate: DriveScienceManagerDelegate?
    var tripTrackerDelegate: DriveScienceTrackerDelegate?
    var tripTrackerClientDelegate: DriveScienceClientDelegate?

    func setClient(_ clientId: String, environmentString: String) -> Bool {
        self.clientId = clientId
        self.environment = DriveScienceManager.stringToEnvironment(environmentString)
        self.ttdsManagerDelegate = DriveScienceManagerDelegate()
        self.tripTrackerDelegate = DriveScienceTrackerDelegate()

        self.tripTrackerClientDelegate = DriveScienceClientDelegate()
        self.ttdsManager = TripTrackerDriveScienceManager(
            clientId: clientId,
            environment: environment!,
            delegate: self.ttdsManagerDelegate!,
            clientDelegate: self.tripTrackerClientDelegate)

        ttdsManager?.tripTracker.delegate = self.tripTrackerDelegate
        return true
    }

    func createDriver(
        driverId: String,
        email: String,
        phone: String,
        resolver resolve:
        @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock)
    {
        ttdsManagerDelegate?.resolve = resolve
        ttdsManagerDelegate?.reject = reject
        ttdsManager?.createDriver(driverId: driverId, email: email, phone: phone)
    }

    func activate(_ driverId: String,
                  resolver resolve: @escaping RCTPromiseResolveBlock,
                  rejecter reject: @escaping RCTPromiseRejectBlock,
                  eventEmitter: RCTEventEmitter)
    {
        ttdsManagerDelegate?.resolve = resolve
        ttdsManagerDelegate?.reject = reject

        guard let ttdsManager = self.ttdsManager else { return }
        ttdsManager.activate(driverId: driverId)
        guard let tripTrackerClientDelegate = self.tripTrackerClientDelegate else { return }
        tripTrackerClientDelegate.eventEmitter = eventEmitter
    }

    func attachLog(_ level: String,
                   resolver resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock,
                   eventEmitter: RCTEventEmitter)
    {
        guard let tripTrackerDelegate = self.tripTrackerDelegate else { return }
        tripTrackerDelegate.eventEmitter = eventEmitter
        let logDelegate = DriveScienceLogDelegate(DriveScienceLogDelegate.fromString(level))
        logDelegate.eventEmitter = eventEmitter
        Log.addLogDelegate(logDelegate)
        resolve(true)
    }

    func deactivate(_ resolve: @escaping RCTPromiseResolveBlock,
                    rejecter reject: @escaping RCTPromiseRejectBlock) {
        guard let ttdsManager = self.ttdsManager else { return }
        ttdsManager.deactivate()
        resolve(true)
    }

    func isActive(_ resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock)
    {
        resolve(ttdsManager?.storedIsTrackingStatus ?? false)
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

    func didReceiveDriverId(_ driverId: String) {
        resolve?(driverId)
    }

    func didNotReceiveDriverId(_ errorMessage: String) {
        reject?(errorMessage, errorMessage, nil)
    }

    func activationDidSucceed(_ manager: TripTrackerDriveScienceManager) {
        resolve?(true)
    }

    func activationDidFail(_ manager: TripTrackerDriveScienceManager, errorMessage: String) {
        reject?(errorMessage, errorMessage, nil)
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

class DriveScienceClientDelegate: TripTrackerClientDelegate {
    public var eventEmitter: RCTEventEmitter?

    func didStartTrip(_ tripId: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripStart", body: tripId)
    }

    func didEndTrip(_ tripId: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripEnd", body: tripId)
    }
}

class DriveScienceLogDelegate: LogDelegate {

    enum LogLevel: String {
        case Debug = "debug"
        case Info = "info"
        case Warning = "warning"
        case Error = "error"
    }

    public var eventEmitter: RCTEventEmitter?
    public var level: LogLevel

    public static func fromString(_ levelString: String) -> LogLevel {
        LogLevel(rawValue: levelString) ?? LogLevel.Warning
    }

    public init(_ level: LogLevel) {
        self.level = level
    }

    func sendLog(_ message: String) {
        guard let eventEmitter = self.eventEmitter else { return }
        eventEmitter.sendEvent(withName: "TripLog", body: message)
    }

    func debugLogged(_ message: String) {
        if (level == .Debug) {
            sendLog("Debug " + message)
        }
    }

    func infoLogged(_ message: String) {
        if (level == .Debug || level == .Info) {
            sendLog("Info " + message)
        }
    }

    func warningLogged(_ message: String) {
        if (level == .Debug || level == .Info || level == .Warning) {
            sendLog("Warning " + message)
        }
    }

    func errorLogged(_ message: String) {
        sendLog("Error " + message)
    }
}

