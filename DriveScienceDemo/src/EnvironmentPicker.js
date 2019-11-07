import React from "react"
import { Picker, View } from "react-native"
import styles from "./styles.js"

const EnvironmentPicker = ({ environment, onChange }) => {
  return (
    <View style={styles.sectionContainer}>
      <Picker
        selectedValue={environment}
        onValueChange={itemValue => onChange(itemValue)}>
        <Picker.Item label="Local" value="local" />
        <Picker.Item label="Staging" value="staging" />
      </Picker>
    </View>
  )
}

export default EnvironmentPicker
