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

const App = () => {
  const [environment, setEnvironment] = useState("local")

  DriveScienceLibrary.initDriveScienceManager(
    "29728a79-0036-4f45-9e4c-0b1d3bfe609f",
    DriveScienceLibrary.Environment.STAGING,
  )

  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>
          <Header />
          <UserNameEntry />
          <EnvironmentPicker
            environment={environment}
            onChange={setEnvironment}
          />
          <Log />
          <View>
            <Button title="Reset all tokens" />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default App
