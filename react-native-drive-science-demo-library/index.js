import { NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initRootSdk(clientId, rootDriverToken, environment, callback) {
  const { RootSdk } = NativeModules;
  RootSdk.initRootSdk(clientId, rootDriverToken, environment, callback);
}
