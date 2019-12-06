import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import CircleButton from "react-native-circle-button";
import axios from "axios";
axios.defaults.baseURL = "http://172.17.0.2:3000/";

import BookCard from "./BookCard";
import AddBook from "./AddBook";

const createBooks = () => {
  items = [];

  book = {
    _id: {
      $oid: "5dea8a74f668220001f3df99"
    },
    author: "charles dickenes",
    borrower_id: {
      $oid: "5dea8a64f668220001f3df98"
    },
    days_to_borrow: null,
    owner_id: {
      $oid: "5dea8a64f668220001f3df98"
    },
    reserved: 0,
    title: "Oliver Twist"
  };
  items.push(book);

  book1 = {
    _id: {
      $oid: "5dea8a9cf668220001f3df9a"
    },
    author: "charles dickenes",
    borrower_id: {
      $oid: "5dea8160f668220001f3df95"
    },
    days_to_borrow: null,
    owner_id: {
      $oid: "5dea8160f668220001f3df95"
    },
    reserved: 1,
    title: "A tale of two cities"
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
      bookList: createBooks()
      // bookList: null
    };
  }

  componentDidMount() {
    axios
      .get(`/user_books/${this.props.user.id}`)
      .then(response => {
        this.setState({
          bookList: response.data
        });
      })

      .catch(error => {
        console.log(`error: ${error}`);
      });
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
    userBookCards = null;
    if (this.state.bookList) {
      userBookCards = this.state.bookList.map(book => {
        return <BookCard book={book} key={book._id.$oid} />;
      });
    }

    if (userBookCards) {
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
              }}
            />
          </View>
          <AddBook
            visible={this.state.reservationVisible}
            onModalClosed={this.hideDetails}
          />
        </View>
      );
    } else {
      return <Text>{"Loading ...."}</Text>;
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
export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
