import React from "react"
import { ScrollView, Text, View } from "react-native"
import styles from "./styles.js"

const Log = ({ logText }) => {
  return (
    <View style={styles.scrollViewContainer}>
      <Text style={styles.sectionTitle}>Log:</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionBody}>{logText.join("\n")}</Text>
      </ScrollView>
    </View>
  )
}

export default Log
