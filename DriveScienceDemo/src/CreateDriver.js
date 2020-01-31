import React, { useState } from "react"
import { Button, Keyboard, View, Text, TextInput } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const createDriver = async (
  log,
  driverId,
  email,
  phone,
  setDriverResponseId,
) => {
  Keyboard.dismiss()
  try {
    await DriveScienceLibrary.createDriver(driverId, email, phone)
  } catch (error) {
    log(`error ${error}`)
  }
}

const CreateDriver = ({ log }) => {
  const [driverId, setDriverId] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Enter Driver Id:</Text>
      <TextInput
        style={styles.textFieldStyle}
        onChangeText={text => setDriverId(text)}
      />
      <Text style={styles.sectionTitle}>Enter Email:</Text>
      <TextInput
        style={styles.textFieldStyle}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.sectionTitle}>Enter Phone:</Text>
      <TextInput
        style={styles.textFieldStyle}
        onChangeText={text => setPhone(text)}
      />
      <View style={styles.row}>
        <Button
          title="Create Driver"
          onPress={() => createDriver(log, driverId, email, phone)}
        />
      </View>
    </View>
  )
}

export default CreateDriver
