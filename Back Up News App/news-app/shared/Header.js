import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { setTheme } from "../redux/actions/Themes";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { Icon } from "native-base";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  openMenu = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <View style={styles.header}>
        {/* <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            // right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
        <TouchableOpacity>
          <AntDesign
            onPress={() => this.openMenu()}
            type="AntDesign"
            style={{ color: "#ddd" }}
            size={25}
            name="menu-fold"
          />
        </TouchableOpacity>
        {/* </View> */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerText}>{this.props.headerText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    width: Dimensions.get("window").width - 30,
  },
  headerTT: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "300",
    fontSize: RFPercentage(4),
    letterSpacing: 1,
    color: "#ddd",
  },
  icon: {
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    color: state.themeReducer.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (color) => dispatch(setTheme(color)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
