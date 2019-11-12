import { NativeModules } from "react-native";
const { DriveScienceDemoLibrary } = NativeModules;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initRootSdk(clientId, rootDriverToken, environment, callback) {
  DriveScienceDemoLibrary.initRootSdk(
    clientId,
    rootDriverToken,
    "staging",
    callback
  );
}
