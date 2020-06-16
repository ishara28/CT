import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Header from "../../shared/Header";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/Themes";

import React, { Component } from "react";
import { View } from "react-native";
import NewsDetails from "../../screens/news/NewsDetails";
import Weather from "../../screens/Weather";

const screens = {
  Weather: {
    screen: Weather,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} headerText="Weather News" />
        ),
      };
    },
  },
  NewsDetails: {
    screen: NewsDetails,
    navigationOptions: {
      headerTitle: "News Details",
    },
  },
};

const WeatherStack = createStackNavigator(screens, {
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

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStack);
