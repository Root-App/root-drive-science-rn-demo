import { NativeModules } from "react-native";

const { DriveScienceDemoLibrary } = NativeModules;

export default DriveScienceDemoLibrary;

export const Environment = { STAGING: "staging", PRODUCTION: "production" };

export function initRootSDK(clientId, rootDriverToken, environment, callback) {
  const { RootSDK } = NativeModules;
  RootSDK.initRootSDK(clientId, rootDriverToken, environment, callback);
}
