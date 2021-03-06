import Header from "./src/Header.js"
import Log from "./src/Log.js"
import React, { useState } from "react"
import TrackerStartStop from "./src/TrackerStartStop.js"
import CreateDriver from "./src/CreateDriver.js"
import styles from "./src/styles.js"
import { Button, Clipboard, SafeAreaView, View, ScrollView } from "react-native"

function useAppendableText() {
  const [text, setText] = useState([])
  const updateText = newText => {
    const fullLine = `${new Date().toLocaleTimeString()}: ${newText}`
    setText(oldText => {
      if (fullLine !== oldText[0]) {
        return [fullLine, ...oldText]
      } else {
        return oldText
      }
    })
  }
  const clearText = () => {
    setText([])
  }
  return [text, updateText, clearText]
}

const copyLog = async logText => {
  await Clipboard.setString(logText.join("\n"))
}

const App = () => {
  const [activeDriverId, setActiveDriverId] = useState("")
  const [logText, updateLog, clearLog] = useAppendableText()

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.body}>
          <Header />
          <TrackerStartStop
            updateLog={updateLog}
            activeDriverId={activeDriverId}
          />
          <CreateDriver
            log={updateLog}
            activeDriverId={activeDriverId}
            setActiveDriverId={setActiveDriverId}
          />
          <Log logText={logText} />
          <View style={styles.row}>
            <Button title="Clear log" onPress={() => clearLog()} />
            <Button title="Copy Log" onPress={() => copyLog(logText)} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default App
