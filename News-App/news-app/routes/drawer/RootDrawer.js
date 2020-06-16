import { createDrawerNavigator } from "react-navigation-drawer";
import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { Image, Dimensions, View } from "react-native";
import CustomDrawer from "../../shared/CustomeDrawer";
import { createAppContainer } from "react-navigation";
import LocalStack from "../stack/LocalStack";
import InternationalStack from "../stack/InternationalStack";
import WeatherStack from "../stack/WeatherStack";
import HomeStack from "../stack/HomeStack";
import SportsStack from "../stack/SportsStack";
import EntertainmentStack from "../stack/EntertainmentStack";
import PoliticalStack from "../stack/PoliticalStack";
import { AppLoading, Notifications } from "expo";

const rootDrawNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Local: {
      screen: LocalStack,
    },
    International: {
      screen: InternationalStack,
    },
    Political: {
      screen: PoliticalStack,
    },
    Sports: {
      screen: SportsStack,
    },
    Entertainment: {
      screen: EntertainmentStack,
    },
    Weather: {
      screen: WeatherStack,
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomDrawer,
    //Sidebar width
    drawerWidth: Dimensions.get("window").width - 125,
  }
);

export default createAppContainer(rootDrawNavigator);
