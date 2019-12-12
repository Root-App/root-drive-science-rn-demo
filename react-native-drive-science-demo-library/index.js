import { NativeEventEmitter, NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initialize(clientId, environmentString) {
  DriveScienceDemoLibrary.initialize(clientId, environmentString);
}

export function setToken(token) {
  return DriveScienceDemoLibrary.setToken(token);
}

export function activate() {
  return DriveScienceDemoLibrary.activate();
}

export function deactivate() {
  return DriveScienceDemoLibrary.deactivate();
}

export function shouldReactivate() {
  return DriveScienceDemoLibrary.shouldReactivate();
}

export const emitter = new NativeEventEmitter(DriveScienceDemoLibrary);
