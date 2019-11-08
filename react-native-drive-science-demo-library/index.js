import { NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initRootSDK(clientId, rootDriverToken, environment, callback) {
  DriveScienceDemoLibrary.initRootSDK(clientId, rootDriverToken, environment, callback);
}
