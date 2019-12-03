import React, { Component } from "react";
import { connect } from "react-redux";
import * as Google from "expo-google-app-auth";
import axios from "axios";
axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/FootballProject/FieldHerosApp/1.0.0";

import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { authUser } from "../../store/actions/index";

class Login extends Component {
  static navigationOptions = {
    title: "Please Sign in"
  };

  async userLogin() {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId:
          "869039466780-d7a4t533o0iqq8s38lkcanekp2djj8f6.apps.googleusercontent.com"
      });
      if (type === "success") {
        console.log("token: "+accessToken);
        console.log(user);
        this.props.authUser(accessToken,user);
        this.props.navigation.navigate("HomeScreen");
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        {/* <Button
            iconRight={false}
            title="Log in with Google Account"
            style={styles.loginButton}
            onPress={this.userLogin.bind(this)}
            ref={input => (this.btnLogin = input)}
          /> */}
        {/* <TouchableOpacity
          style={styles.FacebookStyle}
          activeOpacity={0.5}
          onPress={this.userLogin.bind(this)}
        >
          <Image
            source={require("../../../assets/facebook_login.png")}
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Login Using Facebook </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.GooglePlusStyle}
          activeOpacity={0.5}
          onPress={this.userLogin.bind(this)}
        >
          <Image
            source={require("../../../assets/google_login.png")}
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Login Using Google Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width: "100%",
    padding: 25,
    paddingRight: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15
  },
  loginButton: {
    width: "30%",
    color: "#841584"
  },
  FacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5
  },
  GooglePlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc4e41",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch"
  },

  TextStyle: {
    color: "#fff",
    marginBottom: 4,
    marginRight: 20
  },

  SeparatorLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 40
  }
});

const mapStateToProps = state => {
  return {
    userName: state.login.userName,
    password: state.login.password,
    isRememberMe: state.login.isRememberMe,
    forgotPasswordModalVisible: state.login.forgotPasswordModalVisible,
    token: state.login.authToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enterUserName: name => dispatch(enterUserName(name)),
    enterPassword: password => dispatch(enterPassword(password)),
    rememberMe: flag => dispatch(rememberMe(flag)),
    forgotPassword: isVisible => dispatch(forgotPassword(isVisible)),
    authUser: token => dispatch(authUser(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
