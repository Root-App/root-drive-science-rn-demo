import { NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initialize(clientId, environmentString) {
  DriveScienceDemoLibrary.initialize(clientId, environmentString);
}

export function setToken(token, tokenCallback) {
  DriveScienceDemoLibrary.setToken(token, tokenCallback);
}

export function activate(trackerCallback) {
  DriveScienceDemoLibrary.activate(trackerCallback);
}

export function deactivate() {
  DriveScienceDemoLibrary.deactivate();
}

export function isActive() {
  return DriveScienceDemoLibrary.isActive();
}
