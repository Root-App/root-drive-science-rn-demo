import React from "react"
import { Text, View } from "react-native"
import styles from "./styles.js"

const Log = ({ logText }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Log:</Text>
      <Text numberOfLines={40} style={styles.textAreaStyle}>
        {logText.join("\n")}
      </Text>
    </View>
  )
}

export default Log
