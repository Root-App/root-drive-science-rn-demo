import React, { useState } from "react"
import { Button, Keyboard, View, Text, TextInput } from "react-native"
import styles from "./styles.js"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

const CreateDriver = ({ log, activeDriverId, setActiveDriverId }) => {

  const [driverId, setDriverId] = useState(activeDriverId)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const onCreateDriver = async () => {
    Keyboard.dismiss()
    try {
      var driver = await DriveScienceLibrary.createDriver({driverId, email, phone})
      log(`DriverId: '${driver}'`)
      setDriverId(driver)
      setActiveDriverId(driver)
    } catch (error) {
      log(`CreateDriver error: ${error}`)
      setDriverId(activeDriverId)
    }
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Enter Driver Id:</Text>
      <TextInput
        value={driverId}
        style={styles.textFieldStyle}
        onChangeText={text => setDriverId(text)}
      />
      <Text style={styles.sectionTitle}>Enter Email:</Text>
      <TextInput
        value={email}
        style={styles.textFieldStyle}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.sectionTitle}>Enter Phone:</Text>
      <TextInput
        value={phone}
        style={styles.textFieldStyle}
        onChangeText={text => setPhone(text)}
      />
      <View style={styles.row}>
        <Button
          title="Create Driver"
          onPress={onCreateDriver}
        />
      </View>
    </View>
  )
}

export default CreateDriver
