import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import CircleButton from "react-native-circle-button";

import BookCard from "./BookCard";
import AddBook from "./AddBook";

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
    owner: `Ali Ashraf`,
    reserved: 1,
    ownerEmail: "ali@gmail.com"
  };
  items.push(book1);

  return items;
};
class MyBooks extends Component {
  static navigationOptions = {
    title: "My books"
  };
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      reservationVisible: false,
      itemList: createBooks()
    };
  }
  hideDetails = () => {
    this.setState({
      reservationVisible: false
    });
  };
  showDetails() {
    this.setState({
      reservationVisible: true
    });
  }

  render() {
    const userBookCards = this.state.itemList.map(item => {
      return <BookCard book={item} key={item.key} />;
    });

    return (
      <View style={styles.container}>
        {userBookCards}

        <View
          style={{ flex: 1, position: "absolute", bottom: "2%", right: "2%" }}
        >
          <CircleButton
            size={45}
            onPressButtonRight={() => {
              this.showDetails();
              //console.log(this.props.user);
            }}
          />
        </View>
        <AddBook
          visible={this.state.reservationVisible}
          onModalClosed={this.hideDetails}
        />
      </View>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
