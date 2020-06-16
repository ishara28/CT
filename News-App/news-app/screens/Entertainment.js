import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import NewsHeading from "./news/NewsHeading";
import { firebasedb } from "../config/db";
import PTRView from "react-native-pull-to-refresh";
import { FlatList } from "react-native-gesture-handler";
import { Button, Spinner , Row} from "native-base";

export class Entertainment extends Component {
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
    firebasedb
      .ref("/news")
      .limitToLast(200)
      .on("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let newsList = { ...data };
        let newState = [];
        let count = 0;
        for (let news in newsList) {
          if (newsList[news].newsType == "Entertainment" && count < 46) {
            count++;
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

  refresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  renderFlatList = () => {
    let copied = [...this.state.newsList];
    return (
      <View>
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

  getItemCount = (data) => {
    return 50;
  };

  render() {
    let copied = [...this.state.newsList];

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
              <Text style={{ color: "white" }}>Loading...</Text>
            </Row>
          </View>
        </View>
      );
    } else {
      return (
        <PTRView onRefresh={this.refresh}>
          <ScrollView>{this.renderFlatList()}</ScrollView>
        </PTRView>
      );
    }
  }
}

export default Entertainment;
