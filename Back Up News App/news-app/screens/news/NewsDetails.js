import React, { Component } from "react";
import FlexImage from "react-native-flex-image";
import { View, Text, Linking, Share, StyleSheet, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { H1, H2, H3, Icon, Row, Button, Footer, FooterTab } from "native-base";
import TimeAgo from "react-native-timeago";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import WebView from "react-native-webview";

export class NewsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getExtraImages = () => {
    this.props.navigation.getParam("news").imagesUrls.map((url) => {
      return (
        <View
          style={{
            overflow: "hidden",
            borderRadius: 7,
            margin: 10,
            marginHorizontal: 25,
          }}
        >
          <FlexImage
            source={{
              uri: url,
            }}
          />
        </View>
      );
    });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "𝕮𝖔𝖑𝖔𝖒𝖇𝖔 𝕿𝖎𝖒𝖊𝖘 ©" +
          "\n \n" +
          "🔵" +
          this.props.navigation.getParam("news").header +
          "\n \n " +
          this.props.navigation.getParam("news").newsContent +
          "\n \n" +
          this.props.navigation.getParam("news").videoLink +
          "\n \n" +
          "www.colombotimes.lk",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={{ overflow: "hidden", borderRadius: 7, margin: 10 }}>
          <FlexImage
            source={{
              uri: this.props.navigation.getParam("news").headerImgUrl,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "black",
            padding: 6,
            marginHorizontal: 10,
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              color: "#ddd",
              marginTop: 10,
              textAlign: "center",
              fontSize: RFPercentage(3),
            }}
          >
            {this.props.navigation.getParam("news").header}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>BY COLOMBO TIMES</Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row-reverse", marginTop: 10 }}
          >
            <TimeAgo
              time={this.props.navigation.getParam("news").date}
              style={{
                fontSize: RFPercentage(1.8),
                color: "#494646",
                marginRight: 20,
              }}
            />
            <Icon
              type="Feather"
              name="clock"
              style={{ fontSize: RFPercentage(1.8), marginRight: 3 }}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 5,
          }}
        >
          <Text style={{ textAlign: "justify" }}>
            {this.props.navigation.getParam("news").newsContent}
          </Text>
        </View>
        <View>
          <FlatList
            data={this.props.navigation.getParam("news").imagesUrls}
            renderItem={({ item }) =>
              item != "" && (
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 7,
                    margin: 15,
                    marginHorizontal: 25,
                  }}
                >
                  <FlexImage source={{ uri: item }} />
                </View>
              )
            }
            initialNumToRender={2}
            maxToRenderPerBatch={1}
          />
          {this.props.navigation.getParam("news").videoLink != "" && (
            <View style={{ height: 200, marginHorizontal: 10 }}>
              <WebView
              
                allowsFullscreenVideo={true}
                style={styles.WebViewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                  uri: this.props.navigation.getParam("news").videoLink,
                }}
              />
            </View>
          )}
          <View style={{ marginTop: 15 }}>
            <Text style={{ marginHorizontal: 20, fontStyle: "italic" }}>
              Published in{" "}
              <Text style={{ color: "blue" }}>
                {this.props.navigation.getParam("news").newsType}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 50 }}>
          <FlexImage source={require("../../assets/longLogo.png")} />
        </View>

        {/* <View style={{ height: 20 }}></View> */}
        <Button
          full
          style={{
            backgroundColor: "black",
            marginHorizontal: 20,
            borderRadius: 7,
          }}
          onPress={this.onShare}
        >
          <Row
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Share</Text>
            <Icon
              style={{ color: "white", fontSize: 18 }}
              type="Entypo"
              name="share"
            />
          </Row>
        </Button>
        <View style={{ height: 10 }}></View>
      </ScrollView>
    );
  }
}

export default NewsDetails;

const styles = StyleSheet.create({
  WebViewContainer: {
    marginTop: Platform.OS == "android" ? 20 : 0,
  },
});
