/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Header from "./src/Header.js"
import Log from "./src/Log.js"
import React, { useState } from "react"
import UserNameEntry from "./src/UserNameEntry.js"
import styles from "./src/styles.js"
import { Button, SafeAreaView, View } from "react-native"

function useAppendableText() {
  const [text, setText] = useState([])
  const updateText = newText => {
    let fullLine = `${new Date().toLocaleTimeString()}: ${newText}`
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

const App = () => {
  const [users, setUsers] = useState({})
  const [log, updateLog, clearLog] = useAppendableText()

  return (
    <>
      <SafeAreaView style="styles.safeArea">
        <View style={styles.body}>
          <Header />
          <UserNameEntry log={updateLog} users={users} setUsers={setUsers} />
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
