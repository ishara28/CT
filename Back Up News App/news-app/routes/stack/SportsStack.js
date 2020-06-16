// import { createStackNavigator } from "react-navigation-stack";
// import React from "react";
// import Sports from "../../screens/Sports";

// const screens = {
//   Sports: {
//     screen: Sports,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitle: () => (
//           <Header navigation={navigation} headerText="Sports News" />
//         ),
//       };
//     },
//   },
// };

// const SportsStack = createStackNavigator(screens);

// export default SportsStack;


import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Header from "../../shared/Header";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/Themes";

import React, { Component } from "react";
import { View } from "react-native";
import NewsDetails from "../../screens/news/NewsDetails";
import Sports from "../../screens/Sports";



const screens = {
  Sports: {
    screen: Sports,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} headerText="Sport News" />
        ),
      };
    },
  },
  NewsDetails: {
    screen: NewsDetails,
  },
};

const SportsStack = createStackNavigator(screens, {
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

export default connect(mapStateToProps, mapDispatchToProps)(SportsStack);
