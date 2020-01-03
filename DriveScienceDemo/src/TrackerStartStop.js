import React, { useEffect, useState } from "react"
import { Button, Keyboard, View } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const logLevel = "warning"

const onSuccessfulTokenSet = async (rootDriverToken, log) => {
  try {
    const eventMessage = await DriveScienceLibrary.activate()
    DriveScienceLibrary.attachLog(logLevel).then(() =>
      log(`Logging at ${logLevel}`),
    )
    log(`Token: ${rootDriverToken}`)
    log(`activation event: ${eventMessage}`)
  } catch (message) {
    log(`activation error: ${message}`)
  }
}

const startTracking = async (log, setIsTracking) => {
  Keyboard.dismiss()
  try {
    const returnedToken = await DriveScienceLibrary.setToken(null)
    await onSuccessfulTokenSet(returnedToken, log)
    setIsTracking(true)
  } catch (error) {
    log(`error ${error}`)
  }
}

const stopTracking = (log, setIsTracking) => {
  DriveScienceLibrary.deactivate().then(() => log("TripTracker stopped"))
  setIsTracking(false)
}

let listenersEnabled = false

const TrackerStartStop = ({ log }) => {
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    const fetchIsTracking = async () => {
      const [
        shouldReactivate,
        token,
      ] = await DriveScienceLibrary.shouldReactivate()
      if (shouldReactivate) {
        log(`Re-activating with token ${token}`)
        setIsTracking(true)
        DriveScienceLibrary.attachLog(logLevel).then(() =>
          log(`Re-Logging at ${logLevel}`),
        )
      } else {
        setIsTracking(false)
      }
    }
    fetchIsTracking()
  }, [])

  if (!listenersEnabled) {
    listenersEnabled = true
    DriveScienceLibrary.emitter.addListener("TripEvent", message =>
      log(`trip event: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripError", message =>
      log(`trip error: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripLog", message =>
      log(`log: ${message}`),
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.row}>
        <Button
          title="Start Tracking"
          disabled={isTracking}
          onPress={() => startTracking(log, setIsTracking)}
        />
        <Button
          title="Stop Tracking"
          disabled={!isTracking}
          onPress={() => stopTracking(log, setIsTracking)}
        />
      </View>
    </View>
  )
}

export default TrackerStartStop
