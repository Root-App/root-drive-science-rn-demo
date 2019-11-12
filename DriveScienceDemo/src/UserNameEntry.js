import React, { useState } from "react"
import { Button, Keyboard, Text, TextInput, View } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const startTracking = userName => {
  Keyboard.dismiss()

  DriveScienceLibrary.initRootSdk(
    "CLIENT ID",
    "",
    DriveScienceLibrary.Environment.STAGING,
    (error, rootDriverToken) => {
      // this is not built out yet
      // if (rootDriverToken && rootDriverToken !== user.rootDriverToken) {
      //   updateUser({ variables: { userInput: { rootDriverToken } } })
      // }
      console.warn(`I've Got A token: ${rootDriverToken}`)
    },
  )
}

const UserNameEntry = () => {
  const [userName, setUserName] = useState("")
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Enter User Name:</Text>
      <TextInput
        style={styles.textFieldStyle}
        onChangeText={text => setUserName(text)}
      />
      <Button title="Start Tracking" onPress={() => startTracking(userName)} />
    </View>
  )
}

export default UserNameEntry
