import React, { Component } from "react";
import { connect } from "react-redux";
import * as Google from "expo-google-app-auth";

import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { userLogin } from "../../store/actions/index";
import axios from "axios";
import { URL, GOOGLE_KEY } from "../../../config/config.js";
axios.defaults.baseURL = URL;

class Login extends Component {
  static navigationOptions = {
    title: "Please Sign in"
  };

  async userLogin() {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: GOOGLE_KEY
      });
      if (type === "success") {
        const payLoad = {
          email: user.email,
          familyName: user.familyName,
          givenName: user.givenName,
          id: user.id,
          name: user.name,
          photoUrl: user.photoUrl
        };
        axios
          .post("/users", payLoad)
          .then(async response => {
            
            await this.props.userLogin(response.data);
            
            this.props.navigation.navigate("HomeScreen");
          })
          .catch(error => {
            console.log(`all books error: ${error}`);
          });
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    return (
      <View style={styles.inputContainer}>
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
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => dispatch(userLogin(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
