import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FlexImage from "react-native-flex-image";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import TimeAgo from "react-native-timeago";
import { Icon } from "native-base";

export class NewsHeading extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", margin: 5 }}
          onPress={this.props.pressHandler}
        >
          <View
            style={{
              flex: 1,
              margin: 3,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <FlexImage
              source={{ uri: this.props.news.headerImgUrl }}
              // style={{ borderRadius: 5 }}
            />
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text>
              ⚫{this.props.news.header.length <= 50 && this.props.news.header}
              {this.props.news.header.length > 50 &&
                this.props.news.header.slice(0, 50) + "..."}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <TimeAgo
            time={this.props.news.date}
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
    );
  }
}

export default NewsHeading;
