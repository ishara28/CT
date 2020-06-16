import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  VirtualizedList,
  Vibration,
} from "react-native";
import NewsHeading from "./news/NewsHeading";
import { firebasedb } from "../config/db";
import PTRView from "react-native-pull-to-refresh";
import { FlatList } from "react-native-gesture-handler";
import FlexImage from "react-native-flex-image";
import { Button, Spinner, Icon } from "native-base";
import TimeAgo from "react-native-timeago";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AppLoading, Notifications } from "expo";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: [],
      loading: true,
      notification: {},
    };
  }
  componentDidMount() {
    this.getData();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    console.log("Handle notification in Home");
    Vibration.vibrate();
    console.log(notification);
    let { origin, data } = notification;
    if (origin === "selected" && data.newsNotify) {
      this.props.navigation.navigate("NewsDetails", {
        news: data.news,
      });
    }
    this.setState({ notification: notification });
  };

  getData = () => {
    firebasedb
      .ref("/news")
      .limitToLast(45)
      .on("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let newsList = { ...data };
        let newState = [];
        for (let news in newsList) {
          newState.push({
            id: news,
            header: newsList[news].header,
            headerImgUrl: newsList[news].headerImgUrl,
            imagesUrls: newsList[news].imagesUrls,
            newsType: newsList[news].newsType,
            newsContent: newsList[news].newsContent,
            date: newsList[news].date,
            videoLink: newsList[news].videoLink,
          });
        }
        this.setState({
          newsList: newState,
          loading: false,
        });
      });
  };

  refresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  renderWelcomeNews = () => {
    let firstNews = [...this.state.newsList].reverse()[0];
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("NewsDetails", {
              news: firstNews,
            })
          }
        >
          <View
            style={{
              flex: 1,
              margin: 3,
              borderRadius: 7,
              overflow: "hidden",
              marginHorizontal: 10,
            }}
          >
            <FlexImage source={{ uri: firstNews.headerImgUrl }} />
          </View>
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>
            {" "}
            🔵 {firstNews.header}
          </Text>
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <TimeAgo
              time={firstNews.date}
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
        </TouchableOpacity>
      </View>
    );
  };

  renderFlatList = () => {
    let copied = [...this.state.newsList];
    return (
      <View>
        <FlatList
          data={copied.reverse().slice(1)}
          renderItem={({ item }) => (
            <NewsHeading
              news={item}
              pressHandler={() =>
                this.props.navigation.navigate("NewsDetails", {
                  news: item,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={5}
          maxToRenderPerBatch={1}
          windowSize={2}
          removeClippedSubviews={true}
          // onEndReached={() => this.getData()}
        />
      </View>
    );
  };

  getItemCount = (data) => {
    return 50;
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner color="black" />
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <PTRView onRefresh={this.refresh}>
          <View style={{ marginHorizontal: 30 }}>
            <FlexImage source={require("../assets/longLogo.png")} />
          </View>
          <ScrollView>{this.renderWelcomeNews()}</ScrollView>
          <ScrollView>{this.renderFlatList()}</ScrollView>
        </PTRView>
      );
    }
  }
}

export default Home;
