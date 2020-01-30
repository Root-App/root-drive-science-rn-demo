import React, { useEffect, useState } from "react"
import { Button, Keyboard, View, Text } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const logLevel = "warning"

const startTracking = async (updateLog, activeDriverId, setIsTracking) => {
  Keyboard.dismiss()
  try {
    const eventMessage = await DriveScienceLibrary.activate(activeDriverId)

    DriveScienceLibrary.attachLog(logLevel).then(() =>
      updateLog(`Logging at ${logLevel}`),
    )
    updateLog(`Driver Id: ${activeDriverId}`)
    updateLog(`activation event: ${eventMessage}`)
    setIsTracking(true)
  } catch (error) {
    updateLog(`error ${error}`)
  }
}

const stopTracking = (updateLog, setIsTracking) => {
  DriveScienceLibrary.deactivate().then(() => updateLog("TripTracker stopped"))
  setIsTracking(false)
}

let listenersEnabled = false

const TrackerStartStop = ({ updateLog, activeDriverId }) => {
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    const fetchIsTracking = async () => {
      let isActive = await DriveScienceLibrary.isActive()
      if (isActive) {
        updateLog(`TripTracker is still active`)
        setIsTracking(true)
        DriveScienceLibrary.attachLog(logLevel).then(() =>
          updateLog(`Re-Logging at ${logLevel}`),
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
      updateLog(`trip event: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripError", message =>
      updateLog(`trip error: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripLog", message =>
      updateLog(`log: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripStart", message =>
      updateLog(`Trip started with ID: ${message}`),
    )
    DriveScienceLibrary.emitter.addListener("TripEnd", message =>
      updateLog(`Trip ended with ID: ${message}`),
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.row}>
        <Button
          title="Start Tracking"
          disabled={isTracking || !activeDriverId}
          onPress={() => startTracking(updateLog, activeDriverId, setIsTracking)}
        />
        <Button
          title="Stop Tracking"
          disabled={!isTracking}
          onPress={() => stopTracking(updateLog, setIsTracking)}
        />
      </View>
      <Text style={styles.centerSubtitle}>{activeDriverId ? `Active Driver: ${activeDriverId}` : "No active driver" }</Text>
    </View>
  )
}

export default TrackerStartStop
