import React, { useState } from "react"
import { Button, Keyboard, Text, TextInput, View } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const successfulTokenSet = async (
  rootDriverToken,
  userName,
  log,
  users,
  setUsers,
) => {
  log(`Token for ${userName}: ${rootDriverToken}`)
  const newUsers = { ...users }
  newUsers[userName] = rootDriverToken
  setUsers(newUsers)
  try {
    const eventMessage = await DriveScienceLibrary.activate()
    log(`trip event: ${eventMessage}`)
  } catch (message) {
    log(`trip error: ${message}`)
  }
}

const startTracking = async (userName, log, users, setUsers) => {
  Keyboard.dismiss()
  const token = users[userName]
  try {
    const returnedToken = await DriveScienceLibrary.setToken(token)
    successfulTokenSet(returnedToken, userName, log, users, setUsers)
  } catch (error) {
    log(`error ${error}`)
  }
}

const stopTracking = log => {
  DriveScienceLibrary.deactivate().then(() => log("TripTracker stopped"))
}

const UserNameEntry = ({ log, users, setUsers }) => {
  const [userName, setUserName] = useState("")
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
