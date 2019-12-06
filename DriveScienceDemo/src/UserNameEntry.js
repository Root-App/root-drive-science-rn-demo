import React, { useEffect, useState } from "react"
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  View,
  NativeEventEmitter,
} from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const successfulTokenSet = async (
  rootDriverToken,
  userName,
  log,
  users,
  setUsers,
) => {
  const newUsers = { ...users }
  newUsers[userName] = rootDriverToken
  setUsers(newUsers)
  try {
    const eventMessage = await DriveScienceLibrary.activate()
    log(`Token for ${userName}: ${rootDriverToken}`)
    log(`activation event: ${eventMessage}`)
  } catch (message) {
    log(`activation error: ${message}`)
  }
}

const startTracking = async (userName, log, users, setUsers) => {
  Keyboard.dismiss()
  const token = users[userName]
  try {
    const returnedToken = await DriveScienceLibrary.setToken(token)
    await successfulTokenSet(returnedToken, userName, log, users, setUsers)
  } catch (error) {
    log(`error ${error}`)
  }
}

const stopTracking = log => {
  DriveScienceLibrary.deactivate().then(() => log("TripTracker stopped"))
}

let listenersEnabled = false

const UserNameEntry = ({ log, users, setUsers }) => {
  const [userName, setUserName] = useState("")

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
      <Text style={styles.sectionTitle}>Enter User Name:</Text>
      <TextInput
        style={styles.textFieldStyle}
        onChangeText={text => setUserName(text)}
      />
      <View style={styles.row}>
        <Button
          title="Start Tracking"
          onPress={() => startTracking(userName, log, users, setUsers)}
        />
        <Button title="Stop Tracking" onPress={() => stopTracking(log)} />
      </View>
    </View>
  )
}

export default UserNameEntry
