import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
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
        <StatusBar
          barStyle="light-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="black"
          //Background color of statusBar
          translucent={true}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <View style={{ height: 20, backgroundColor: "black" }}></View>
        <WebView
          source={{ uri: "https://vast-retreat-29176.herokuapp.com/" }}
        />
      </View>
    );
  }
}

export default Main;
