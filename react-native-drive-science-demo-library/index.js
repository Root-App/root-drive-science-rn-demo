import { NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initDriveScienceManager(clientId, environmentString) {
  DriveScienceDemoLibrary.initDriveScienceManager(clientId, environmentString);
}

export function activate(token, tokenCallback, trackerCallback) {
  DriveScienceDemoLibrary.activate(token, tokenCallback, trackerCallback);
}

export function deactivate() {
  DriveScienceDemoLibrary.deactivate();
}
