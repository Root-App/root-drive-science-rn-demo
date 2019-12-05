import { StyleSheet } from "react-native"

import { Colors } from "react-native/Libraries/NewAppScreen"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  safeArea: {
    flex: 1,
  },
  textFieldStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  textAreaStyle: {
    height: 350,
    borderColor: "gray",
    borderWidth: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    flexGrow: 1,
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
  scrollViewContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    height: 450,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionBody: {
    fontSize: 12,
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

export default styles
