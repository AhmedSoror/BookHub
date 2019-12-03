import React, { Component } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Login from "../src/componets/LoginScreen/Login";
import Home from "../src/componets/PlaygroundHome/HomeScreen";

import { connect } from "react-redux";

const AppStack = createStackNavigator({ HomeScreen: Home });
const AuthStack = createStackNavigator({ Login: Login });

// const AuthenticationNavigator = createStackNavigator({
//   SignIn: SignInScreen,
//   ForgotPassword: ForgotPasswordScreen,
// });

const AppNavigator = createSwitchNavigator(
  {
    Login: AuthStack,
    HomeScreen: AppStack
  },
  {
    initialRouteName: "HomeScreen"
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}


// const mapStateToProps = state =>{
//   return {

//   };
// };

// export default connect()(App);

export default App;
