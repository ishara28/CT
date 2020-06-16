import React from "react";
import { AppLoading, Notifications } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Navigator from "./routes/drawer/RootDrawer";
import configureStore from "./redux/Store";
import { Provider } from "react-redux";
import Test from "./test/Test";
import * as Permissions from "expo-permissions";
import { firebasedb } from "./config/db";
import Constants from "expo-constants";
import { Vibration, Platform, View } from "react-native";
import { auth } from "firebase";
import firebase from "firebase";

const Store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      expoPushToken: "",
      notification: {},
      users: [],
    };
  }

  async componentDidMount() {
    console.log("CDM");
    this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
      firebasedb.ref("/users").on("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let newsList = { ...data };
        let newState = [];
        for (let news in newsList) {
          newState.push(newsList[news].expoToken);
        }
        this.setState({ users: newState }, () => {
          if (!this.state.users.includes(token)) {
            firebasedb.ref("users").push({
              expoToken: token,
            });
          }
        });
      });
    } else {
      // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  // _handleNotification = (notification) => {
  //   console.log("Handle notification");
  //   Vibration.vibrate();
  //   console.log(notification);
  //   let { origin, data } = notification;
  //   if (origin === "selected") {
  //     this.props.navigation.navigate("NewsDetails");
  //   }
  //   this.setState({ notification: notification });
  // };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={Store}>
        <Container>
          <Navigator />
          {/* <Test /> */}
        </Container>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
