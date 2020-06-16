//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Icon, Footer } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FlexImage from "react-native-flex-image";
import * as OpenAnything from "react-native-openanything";

export default class CustomDrawer extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fwallpaper%2F&psig=AOvVaw2hHd7-hOjiHcCaOPnU0KT4&ust=1585652254796000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjfro6FwugCFQAAAAAdAAAAABAD";
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: "home",
        navOptionName: "Home",
        screenToNavigate: "Home",
      },
      {
        navOptionThumb: "home",
        navOptionName: "Local",
        screenToNavigate: "Local",
      },
      {
        navOptionThumb: "home",
        navOptionName: "International",
        screenToNavigate: "International",
      },
    ];
  }
  render() {
    return (
      <LinearGradient
        colors={["#11111", "#11111", "#11111"]}
        style={{ flex: 1 }}
        locations={[0, 0.5, 1]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.sideMenuContainer}>
            {/*Top Large Image */}
            <FlexImage
              // source={require("../assets/cmbprofile.png")}
              // source={require("../assets/cmbprofile.png")}
              source={require("../assets/cmbprofile.png")}
              style={{
                width: Dimensions.get("window").width - 150,
                height: 100,
              }}
            />

            {/*Divider between Top Image and Sidebar Option*/}
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#e2e2e2",
                marginTop: 15,
              }}
            />
            {/*Setting up Navigation Options from option array using loop*/}

            <View style={{ width: "100%" }}>
              {/* Home Navigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("Home");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon name={"home"} style={{ color: "#ddd" }} size={25} />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"Home"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Local Navigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("Local");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon
                      name={"hand-pointing-right"}
                      type="MaterialCommunityIcons"
                      style={{ color: "#ddd" }}
                      size={25}
                    />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"Local"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* International Navigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("International");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon
                      name={"hand-pointing-right"}
                      type="MaterialCommunityIcons"
                      style={{ color: "#ddd" }}
                      size={25}
                    />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"International"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Political Navigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("Political");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon
                      name={"hand-pointing-right"}
                      type="MaterialCommunityIcons"
                      style={{ color: "#ddd" }}
                      size={25}
                    />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"Political"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Sports Navigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("Sports");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon
                      name={"hand-pointing-right"}
                      type="MaterialCommunityIcons"
                      style={{ color: "#ddd" }}
                      size={25}
                    />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"Sports"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Weather NAvigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("Weather");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon
                      name={"hand-pointing-right"}
                      type="MaterialCommunityIcons"
                      style={{ color: "#ddd" }}
                      size={25}
                    />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"Weather"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Entertainment NAvigation  */}
              <TouchableOpacity
                onPress={() => {
                  // global.currentScreenIndex = key;
                  this.props.navigation.navigate("Entertainment");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? "" : "",
                }}
                // key={key}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10, marginLeft: 20, flex: 1 }}>
                    <Icon
                      name={"home"}
                      name={"hand-pointing-right"}
                      type="MaterialCommunityIcons"
                      style={{ color: "#ddd" }}
                      size={25}
                    />
                  </View>

                  <View style={{ flex: 6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "100",
                        color: "white",
                        // color:
                        //   global.currentScreenIndex === key ? "#ddd" : "#ddd",
                      }}
                    >
                      {"Entertainment"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Icons  */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                flex: 1,
                marginBottom: 20,
                marginLeft: 20,
              }}
            >
              {/* <Text style={{ color: "#ddd" }}>Icons</Text> */}
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() =>
                    OpenAnything.Web("https://twitter.com/colombo_times")
                  }
                >
                  <Icon
                    type="AntDesign"
                    style={{ color: "#ddd" }}
                    size={25}
                    name="twitter"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() =>
                    OpenAnything.Web(
                      "https://www.facebook.com/ColomboTimesSriLanka/"
                    )
                  }
                >
                  <Icon
                    type="AntDesign"
                    style={{ color: "#ddd" }}
                    size={25}
                    name="facebook-square"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => OpenAnything.Instagram("colombo_times")}
                >
                  <Icon
                    type="Feather"
                    style={{ color: "#ddd" }}
                    size={25}
                    name="instagram"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() =>
                    OpenAnything.Web(
                      "https://www.youtube.com/channel/UCvOp59os7jML3EuMl7C960Q?view_as=subscriber"
                    )
                  }
                >
                  <Icon
                    type="FontAwesome"
                    style={{ color: "#ddd" }}
                    size={25}
                    name="youtube-play"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ alignContent: "flex-start", alignItems: "flex-end" }}
            >
              <Text style={{ color: "#ddd", fontSize: 13 }}>Powered By</Text>
              <Text style={{ color: "#ddd", fontSize: 11 }}>Codezone ©</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 220,
    height: 200,
    borderRadius: 150 / 2,
    width: Dimensions.get("window").width - 150,
  },
});
