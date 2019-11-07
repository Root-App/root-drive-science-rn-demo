import React from "react"
import { Text, View } from "react-native"
import styles from "./styles.js"

const Log = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Log:</Text>
      <Text numberOfLines={20} style={styles.textAreaStyle} />
    </View>
  )
}

export default Log
