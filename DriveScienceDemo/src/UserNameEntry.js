import React, { useState } from "react"
import { Button, Keyboard, Text, TextInput, View } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const startTracking = (userName, log, users, setUsers) => {
  Keyboard.dismiss()
  const token = users[userName]

  const tokenCallback = (success, rootDriverToken, message) => {
    if (success) {
      log(`Token for ${userName}: ${rootDriverToken}`)
      const newUsers = { ...users }
      newUsers[userName] = rootDriverToken
      setUsers(newUsers)
    } else {
      log(`error ${message}`)
    }
  }

  const trackerCallback = (success, message) => {
    if (success) {
      log(`trip event: ${message}`)
    } else {
      log(`trip error: ${message}`)
    }
  }

  DriveScienceLibrary.activate(token, tokenCallback, trackerCallback)
}

const stopTracking = log => {
  DriveScienceLibrary.deactivate()
  log("TripTracker stopped")
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
