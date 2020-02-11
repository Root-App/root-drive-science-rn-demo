import { NativeEventEmitter, NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initialize(clientId, environmentString) {
  DriveScienceDemoLibrary.initialize(clientId, environmentString);
}

export function createDriver({driverId, email, phone} = {}) {
  return DriveScienceDemoLibrary.createDriver(driverId, email, phone);
}

export function activate(driverId) {
  return DriveScienceDemoLibrary.activate(driverId);
}

export function deactivate() {
  return DriveScienceDemoLibrary.deactivate();
}

export function configuredToAutoActivate() {
  return DriveScienceDemoLibrary.configuredToAutoActivate();
}

export function attachLog(level) {
  return DriveScienceDemoLibrary.attachLog(level);
}

export const emitter = new NativeEventEmitter(DriveScienceDemoLibrary);
