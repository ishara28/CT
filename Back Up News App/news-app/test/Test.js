import React, { Component } from "react";

import { StyleSheet, View, Platform } from "react-native";
import WebView from "react-native-webview";

export default class App extends Component<{}> {
  render() {
    return (
      <View style={{ height: "100%" }}>
        <WebView
          style={styles.WebViewContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri:
              "https://www.tiktok.com/@chamikaroshan85/video/6818795101238693122",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WebViewContainer: {
    marginTop: Platform.OS == "android" ? 20 : 0,
  },
});
