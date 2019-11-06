/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from "react"
import {
  Button,
  Picker,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen"

const App = () => {
  const [environment, setEnvironment] = useState("local")
  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Welcome to TripTracker</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Enter User Name:</Text>
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            />
            <Button title="Start Tracking" />
          </View>
          <View style={styles.sectionContainer}>
            <Picker
              selectedValue={environment}
              onValueChange={(itemValue, itemIndex) =>
                setEnvironment(itemValue)
              }>
              <Picker.Item label="Local" value="local" />
              <Picker.Item label="Staging" value="staging" />
            </Picker>
          </View>
          <View style={styles.sectionContainer}>
            <Text
              numberOfLines={20}
              style={{ height: 250, borderColor: "gray", borderWidth: 1 }}
            />
            <Button title="Reset all tokens" />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
})

export default App
