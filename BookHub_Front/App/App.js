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
import MyBooks from "../src/components/Home/MyBooks";


import { connect } from "react-redux";

const AppStack = createStackNavigator({ HomeScreen: AllBooks });
const AuthStack = createStackNavigator({ Login: Login });
const AppNavigationContainer = createAppContainer(
  createMaterialTopTabNavigator(
    {
      TabOne: {
        screen: AllBooks
      },
      TabTwo: {
        screen: MyBooks
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
  },
  {
    initialRouteName: "Login"
    // initialRouteName: "HomeScreen"
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
