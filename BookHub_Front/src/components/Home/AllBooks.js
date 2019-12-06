import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, List, ListItem } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import AllBooksCard from "./AllBooksCard";

const createBooks = () => {
  items = [];

  book = {
    key: 0,
    title: `Oliver Twist`,
    owner: `Ali Ashraf`,
    reserved: 0,
    ownerEmail: "ali@gmail.com"
  };
  items.push(book);

  book1 = {
    key: 1,
    title: `A tale of two cities`,
    owner: `Mostafa Ibrahim`,
    reserved: 1,
    ownerEmail: "mostafa@gmail.com"
  };
  items.push(book1);

  return items;
};
class HomeScreen extends Component {
  static navigationOptions = {
    title: "All books"
  };
  constructor(props) {
    super(props);
    this.state = {
      itemList: createBooks()
    };
  }

  render() {
    const bookCards = this.state.itemList.map(item => {
      return <AllBooksCard book={item} key={item.key} />;
    });

    return <View style={styles.container}>{bookCards}</View>;
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
    token: state.login.authToken
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
