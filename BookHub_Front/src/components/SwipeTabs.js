import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Login from "./LoginScreen/Login";
import Home from "./Home/HomeScreen";
const AppNavigationContainer = createAppContainer(
  createMaterialTopTabNavigator(
    {
      TabOne: {
        screen: Login
      },
      TabTwo: {
        screen: Home
      }
    }
  )
);
export default class SwipeTabs extends Component {
  render() {
    return <AppNavigationContainer />;
  }
}
