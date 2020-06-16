import React, { Component } from "react";
import { View, Text } from "react-native";
import FlexImage from "react-native-flex-image";

export class ExtraImages extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <View
          style={{
            overflow: "hidden",
            borderRadius: 7,
            margin: 15,
            marginHorizontal: 25,
          }}
        >
          <FlexImage source={{ uri: this.props.url }} />
        </View>
      </View>
    );
  }
}

export default ExtraImages;
