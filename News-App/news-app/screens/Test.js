import React, { Component } from "react";
import { View, Text } from "react-native";
import WebView from "react-native-webview";
import { Web } from "react-native-openanything";

export class Test extends Component {
  render() {
    return (
      <View>
        <Text>Ishara</Text>
        <Text>Ishara</Text>
        <Text>Ishara</Text>
        <Text>Ishara</Text>
        <View
          style={{
            height: 230,
            marginHorizontal: 10,
          }}
        >
          <WebView
            allowsFullscreenVideo={true}
            source={{ uri: "https://www.youtube.com/watch?v=PIlsRIWvLL0" }}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    );
  }
}

export default Test;
