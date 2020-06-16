import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Vibration,
  Dimensions,
} from "react-native";
import NewsHeading from "./news/NewsHeading";
import { firebasedb } from "../config/db";
import PTRView from "react-native-pull-to-refresh";
import { FlatList } from "react-native-gesture-handler";
import FlexImage from "react-native-flex-image";
import { Button, Spinner, Icon, Row } from "native-base";
import TimeAgo from "react-native-timeago";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AppLoading, Notifications } from "expo";
import HotNews from "./news/HotNews";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: [],
      loading: true,
      notification: {},
      newsNotify: {},
      date: "",
    };
  }
  componentDidMount() {
    this.getData();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );

    var that = this;

    var day = weekday[new Date().getDay()];

    var date = new Date().getDate(); //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      date: day + ", " + month + " " + date + ", " + year,
    });
  }

  _handleNotification = (notification) => {
    //  Code when notification size is larger than accepted!
    // Vibration.vibrate();
    // let { origin, data } = notification;
    // firebasedb.ref("news").on("value", (snapshot) => {
    //   snapshot.forEach((question) => {
    //     var state = question.val();
    //     if (state.header == data.header) {
    //       this.setState({ newsNotify: state }, () => {
    //         if (origin === "selected" && data.header) {
    //           this.props.navigation.navigate("NewsDetails", {
    //             news: this.state.newsNotify,
    //           });
    //         }
    //       });
    //     }
    //   });
    // });
    // this.setState({ notification: notification });

    //Second attempt
    Vibration.vibrate();
    let { origin, data } = notification;
    firebasedb
      .ref("news")
      .orderByChild("header")
      .equalTo(data.header)
      .on("value", (snapshot) => {
        let newsNot = snapshot.val() ? snapshot.val() : {};
        console.log(newsNot);
        for (let news in newsNot) {
          this.setState(
            {
              newsNotify: {
                id: news,
                header: newsNot[news].header,
                headerImgUrl: newsNot[news].headerImgUrl,
                imagesUrls: newsNot[news].imagesUrls,
                newsType: newsNot[news].newsType,
                newsContent: newsNot[news].newsContent,
                date: newsNot[news].date,
                dateToDisplay: newsNot[news].dateToDisplay,
                videoLink: newsNot[news].videoLink,
              },
            },
            () => {
              console.log(this.state.newsNotify);
              if (origin === "selected" && data.header) {
                this.props.navigation.navigate("NewsDetails", {
                  news: this.state.newsNotify,
                });
              }
            }
          );
        }
      });
    this.setState({ notification: notification });

    // Code when normal not comes
    // console.log("Handle notification in Home");
    // Vibration.vibrate();
    // console.log(notification);
    // let { origin, data } = notification;
    // if (origin === "selected" && data.id) {
    //   firebasedb
    //     .ref("news")
    //     .child(data.header)
    //     .on("value", (querySnapshot) => {
    //       let news = querySnapshot.val() ? querySnapshot.val() : {};
    //       console.log(news);
    //       this.props.navigation.navigate("NewsDetails", {
    //         news: news,
    //       });
    //     });
    // }
    // this.setState({ notification: notification });
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
            dateToDisplay: newsList[news].dateToDisplay,
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

  // renderWelcomeNews = () => {
  //   let firstNews = [...this.state.newsList].reverse().slice(0, 5);
  //   return (
  //     <View style={{ marginTop: 10 }}>
  //       <FlatList
  //         data={firstNews}
  //         horizontal={true}
  //         renderItem={({ item }) => (
  //           <TouchableOpacity
  //             style={{ width: Dimensions.get("window").width * 0.75 }}
  //             onPress={() =>
  //               this.props.navigation.navigate("NewsDetails", {
  //                 news: item,
  //               })
  //             }
  //           >
  //             <View
  //               style={{
  //                 flex: 1,
  //                 margin: 3,
  //                 borderRadius: 7,
  //                 overflow: "hidden",
  //                 marginHorizontal: 10,
  //               }}
  //             >
  //               <FlexImage source={{ uri: item.headerImgUrl }} />
  //             </View>
  //             <Text style={{ fontSize: 16, marginHorizontal: 10 }}>
  //               {" "}
  //               🔵 {item.header}
  //             </Text>
  //             <View style={{ flex: 1, flexDirection: "row-reverse" }}>
  //               <TimeAgo
  //                 time={item.date}
  //                 style={{
  //                   fontSize: RFPercentage(1.8),
  //                   color: "#494646",
  //                   marginRight: 20,
  //                 }}
  //               />
  //               <Icon
  //                 type="Feather"
  //                 name="clock"
  //                 style={{ fontSize: RFPercentage(1.8), marginRight: 3 }}
  //               />
  //             </View>
  //           </TouchableOpacity>
  //         )}
  //         keyExtractor={(item) => item.id}
  //         initialNumToRender={5}
  //         maxToRenderPerBatch={1}
  //         windowSize={2}
  //         removeClippedSubviews={true}
  //         // onEndReached={() => this.getData()}
  //       />
  //     </View>
  //   );
  // };

  renderFlatList = () => {
    let copied = [...this.state.newsList];
    return (
      <View>
        <Row>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 20,
              fontFamily: "Roboto_medium",
            }}
          >
            Latest{" "}
          </Text>
          <Icon name="arrow-down" type="Entypo" />
        </Row>

        <FlatList
          data={copied.reverse()}
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

  goFromHotNews = (item) => {
    this.props.navigation.navigate("NewsDetails", {
      news: item,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ddd",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              height: 50,
              borderRadius: 10,
            }}
          >
            <Row
              style={{
                height: 100,
                padding: 10,
                paddingHorizontal: 20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Loading...
              </Text>
            </Row>
          </View>
        </View>
      );
    } else {
      return (
        <PTRView onRefresh={this.refresh}>
          {/* <View style={{ marginHorizontal: 30 }}>
            <FlexImage source={require("../assets/longLogo.png")} />
          </View> */}
          {/* <Text style={{ fontWeight: "bold", marginLeft: 12 }}>
            {this.state.date}
          </Text> */}
          {/* <ScrollView>{this.renderWelcomeNews()}</ScrollView> */}

          <HotNews goFromHotNews={this.goFromHotNews} />
          <View style={{ backgroundColor: "#ddd", height: 8 }}></View>
          <ScrollView>{this.renderFlatList()}</ScrollView>
        </PTRView>
      );
    }
  }
}

export default Home;
