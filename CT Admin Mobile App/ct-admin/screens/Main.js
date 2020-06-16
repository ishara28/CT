import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import PTRView from "react-native-pull-to-refresh";

export class Main extends Component {
  refresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  render() {
    return (
      <View style={{ height: "100%" }}>
        <View style={{ height: 20, backgroundColor: "black" }}></View>
        <WebView source={{ uri: "https://agile-spire-57287.herokuapp.com/" }} />
      </View>
    );
  }
}

export default Main;
