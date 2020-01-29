import React, { useEffect, useState } from "react"
import { Button, Keyboard, View, Text } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const logLevel = "warning"

const startTracking = async (log, activeDriverId, setIsTracking) => {
  Keyboard.dismiss()
  try {
    const eventMessage = await DriveScienceLibrary.activate(activeDriverId)

    DriveScienceLibrary.attachLog(logLevel).then(() =>
      log(`Logging at ${logLevel}`),
    )
    log(`Driver Id: ${activeDriverId}`)
    log(`activation event: ${eventMessage}`)
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

const TrackerStartStop = ({ log, activeDriverId }) => {
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    const fetchIsTracking = async () => {
      let isActive = await DriveScienceLibrary.isActive()
      if (isActive) {
        log(`TripTracker is still active`)
        setIsTracking(true)
        DriveScienceLibrary.attachLog(logLevel).then(() =>
          log(`Re-Logging at ${logLevel}`),
        )

      } else {
        setIsTracking(false)
      }
    }
    fetchIsTracking()
  }, [log])

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
    DriveScienceLibrary.emitter.addListener("TripStart", message =>
      log(`Trip started with ID: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripEnd", message =>
      log(`Trip ended with ID: ${message}`),
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.row}>
        <Button
          title="Start Tracking"
          disabled={isTracking || !activeDriverId}
          onPress={() => startTracking(log, activeDriverId, setIsTracking)}
        />
        <Button
          title="Stop Tracking"
          disabled={!isTracking}
          onPress={() => stopTracking(log, setIsTracking)}
        />
      </View>
      <Text style={styles.centerSubtitle}>{activeDriverId ? `Active Driver: ${activeDriverId}` : "No active driver" }</Text>
    </View>
  )
}

export default TrackerStartStop
