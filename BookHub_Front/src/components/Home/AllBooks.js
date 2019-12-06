import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, List, ListItem } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
axios.defaults.baseURL = "http://172.17.0.2:3000/";

import AllBooksCard from "./AllBooksCard";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "All books"
  };
  componentDidMount() {
    axios
      .get("/books")
      .then(response => {
        this.setState({
          allBookList: response.data
        });
      })

      .catch(error => {
        console.log(`error: ${error}`);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      allBookList: null
    };
  }

  render() {
    if (this.state.allBookList) {
      const bookCards = this.state.allBookList.map(item => {
        return <AllBooksCard book={item} key={item._id.$oid} />;
      });
      return <View style={styles.container}>{bookCards}</View>;
    } else {
      return (
        <View>
          <Text>{"Loading ...."}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20
  }
});

const mapStateToProps = state => {
  return {
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
