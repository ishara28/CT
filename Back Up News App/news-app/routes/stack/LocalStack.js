import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Local from "../../screens/Local";
import Header from "../../shared/Header";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/Themes";

import React, { Component } from "react";
import { View } from "react-native";
import NewsDetails from "../../screens/news/NewsDetails";

class LocalStackClass extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View></View>;
  }
}

const screens = {
  Local: {
    screen: Local,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} headerText="Local News" />
        ),
      };
    },
  },
  NewsDetails: {
    screen: NewsDetails,
  },
};

const LocalStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#ddd",
    headerStyle: {
      backgroundColor: "black",
      height: 80,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(LocalStack);
