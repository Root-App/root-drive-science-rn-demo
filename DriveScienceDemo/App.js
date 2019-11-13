/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import EnvironmentPicker from "./src/EnvironmentPicker.js"
import Header from "./src/Header.js"
import Log from "./src/Log.js"
import React, { useState } from "react"
import UserNameEntry from "./src/UserNameEntry.js"
import styles from "./src/styles.js"
import { Button, SafeAreaView, View } from "react-native"
import * as DriveScienceLibrary from "react-native-drive-science-demo-library"

DriveScienceLibrary.initDriveScienceManager(
  "29728a79-0036-4f45-9e4c-0b1d3bfe609f",
  DriveScienceLibrary.Environment.LOCAL,
)

function useAppendableText() {
  const [text, setText] = useState("")
  const updateText = newText => {
    setText(`${text}\n${new Date().toLocaleTimeString()}: ${newText}`)
  }
  const clearText = () => {
    setText("")
  }
  return [text, updateText, clearText]
}

const App = () => {
  const [environment, setEnvironment] = useState("local")
  const [users, setUsers] = useState({})
  const [log, updateLog, clearLog] = useAppendableText()

  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>
          <Header />
          <UserNameEntry log={updateLog} users={users} setUsers={setUsers} />
          <EnvironmentPicker
            environment={environment}
            onChange={setEnvironment}
          />
          <Log logText={log} />
          <View style={styles.row}>
            <Button title="Reset all tokens" onPress={() => setUsers({})} />
            <Button title="Clear log" onPress={() => clearLog()} />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default App
