import React, { Component } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Login from "../src/components/LoginScreen/Login";
import AllBooks from "../src/components/Home/AllBooks";
import UserBooks from "../src/components/Home/UserBooks";


import { connect } from "react-redux";

const AppStack = createStackNavigator({ HomeScreen: AllBooks });
const AuthStack = createStackNavigator({ Login: Login });
const AppNavigationContainer = createAppContainer(
  createMaterialTopTabNavigator(
    {
      TabOne: {
        screen: UserBooks
      },
      TabTwo: {
        screen: AllBooks
      }
    },
    {
      tabBarOptions: {
        tabStyle: {
          marginTop:24
        }
      }
    }
  )
);
// const AuthenticationNavigator = createStackNavigator({
//   SignIn: SignInScreen,
//   ForgotPassword: ForgotPasswordScreen,
// });

const AppNavigator = createSwitchNavigator(
  {
    Login: AuthStack,
    HomeScreen: AppNavigationContainer,
    // HomeScreen: AppStack,
  },
  {
    // initialRouteName: "Login"
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
