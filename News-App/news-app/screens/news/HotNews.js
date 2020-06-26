import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { firebasedb } from "../../config/db";
import FlexImage from "react-native-flex-image";
import TimeAgo from "react-native-timeago";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Icon, Row } from "native-base";

export class HotNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    firebasedb.ref("/news").on("value", (querySnapshot) => {
      let data = querySnapshot.val() ? querySnapshot.val() : {};
      let newsList = { ...data };
      let newState = [];
      for (let news in newsList) {
        if (newsList[news].isHot == true) {
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
      }
      this.setState({
        newsList: newState,
        loading: false,
      });
    });
  };
  render() {
    let copied = [...this.state.newsList];

    return (
      <View style={{ marginTop: 10 }}>
        <Row>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 20,
              fontFamily: "Roboto_medium",
            }}
          >
            Hot News{" "}
          </Text>
          <Icon name="arrow-right" type="Entypo" />
        </Row>

        <FlatList
          data={copied.reverse().splice(0, 11)}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: Dimensions.get("window").width * 0.75 }}
              onPress={() => this.props.goFromHotNews(item)}
            >
              <View
                style={{
                  margin: 3,
                  borderRadius: 7,
                  overflow: "hidden",
                  marginHorizontal: 10,
                }}
              >
                <FlexImage source={{ uri: item.headerImgUrl }} />
              </View>
              <Text style={{ marginHorizontal: 10 }}> 🔴 {item.header}</Text>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <TimeAgo
                  time={item.date}
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
  }
}

export default HotNews;
