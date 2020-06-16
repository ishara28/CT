import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./screens/Main";

export class App extends Component {
  render() {
    return (
      <View>
        <Main />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
