import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import Collapsible from "react-native-collapsible";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import CircleButton from "react-native-circle-button";
import axios from "axios";
import { URL } from "../../../config/config.js";
axios.defaults.baseURL = URL;

import AddBook from "./AddBook";
import ReservationDetails from "./ReservationDetails";

class MyBooks extends Component {
  static navigationOptions = {
    title: "My books"
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bookInfoCollapsed: true,
      addBookVisible: false,
      reservationVisible: false,
      bookSelected: null,
      bookSelectedBorrower: null,
      bookList: null
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../../../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
    this.fetchBooks();
  }
  async fetchBooks() {
    await axios
      .get(`/user_books/${this.props.user._id.$oid}`)
      .then(response => {
        this.setState({
          bookList: response.data
        });
      })
      .catch(error => {
        console.log(`my books error: ${error}`);
      });

    var newList = this.state.bookList;
    flag = 0;
    for (i = 0; i < newList.length; i++) {
      bookItem = newList[i];
      await axios
        .get(`/users/${bookItem.borrower_id.$oid}`)
        .then(response => {
          bookItem.borrower = response.data;
          bookItem.isCollapsed = true;
          newList[i] = bookItem;
        })
        .catch(error => {
          console.log(`MyBooks L135 error: ${error}`);
        });
      if (i == newList.length - 1) {
        flag = 1;
      }
    }
    if (flag == 1) {
      this.setState({
        bookList: newList
      });
    }
  }

  hideAddBook = () => {
    this.setState({
      addBookVisible: false
    });
    this.fetchBooks();
  };
  showAddBook() {
    this.setState({
      addBookVisible: true
    });
  }

  hideReservation = () => {
    this.setState({
      reservationVisible: false
    });
    this.fetchBooks();
  };
  showReservation(item) {
    this.setState({
      reservationVisible: true,
      selectedItem: item
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if (this.state.bookList) {
      return (
        <Container>
          <Content>
            <List
              dataArray={this.state.bookList}
              renderRow={book => (
                <ListItem thumbnail>
                  <Left>
                    <Image
                      source={require("../../../assets/book.png")}
                      style={styles.ImageIconStyle}
                    />
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onLongPress={() => {
                        Alert.alert(
                          "Delete Book",
                          "Do you really wanna delete this book?",
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "Confirm",
                              onPress: async () => {
                                await axios
                                  .delete(`/books/${book._id.$oid}`)
                                  .then(response => {
                                    this.fetchBooks();
                                  })
                                  .catch(error => {
                                    console.log(`my books error: ${error}`);
                                  });
                                console.log("delete");
                              },
                              style: { color: "red" }
                            }
                          ],
                          { cancelable: false }
                        );
                      }}
                      onPress={async () => {
                        newBooks = this.state.bookList;
                        for (i = 0; i < newBooks.length; i++) {
                          if (newBooks[i]._id.$oid == book._id.$oid) {
                            newBooks[i].isCollapsed = !newBooks[i].isCollapsed;
                          }
                        }
                        await this.setState({ bookList: newBooks });
                      }}
                    >
                      <Text>{book ? book.title : "loading..."}</Text>
                      <Text note numberOfLines={3}>
                        {book?(book.reserved ? "Reserved" : "Available"):""}
                      </Text>
                    </TouchableOpacity>
                    <Collapsible
                      collapsed={
                        book.isCollapsed == undefined ? true : book.isCollapsed
                      }
                    >
                      <Text style={styles.textInfo}>
                        {book?
                          (book.reserved == 1
                          ? book.borrower
                            ? `Borrowed by:\n ${book.borrower.name}\n Phone number:\n ${book.borrower.phone_number}\nEmail:\n ${book.borrower.email}\n `
                            : ""
                          : ""):"loading..."}
                      </Text>
                    </Collapsible>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={async () => {
                        this.setState({
                          bookSelected: book
                        });
                        this.showReservation();
                      }}
                    >
                      <Text>{book?(book.reserved ? "Unreserve" : "Reserve"):""}</Text>
                    </Button>
                  </Right>
                </ListItem>
              )}
              keyExtractor={(book, index) => index.toString()}
            ></List>
          </Content>
          <View
            style={{ flex: 1, position: "absolute", bottom: "2%", right: "2%" }}
          >
            <CircleButton
              size={45}
              iconButtonCenter={require("../../../assets/circle.png")}
              iconButtonTop={require("../../../assets/refresh.png")}
              iconButtonBottom={require("../../../assets/logout.png")}
              iconButtonRight={require("../../../assets/add.png")}
              iconButtonLeft={null}
              onPressButtonRight={() => {
                this.showAddBook();
              }}
              onPressButtonTop={() => {
                this.fetchBooks();
              }}
              onPressButtonBottom={() => {
                this.props.navigation.navigate("Login");
              }}
            />
          </View>
          {this.props.user ? (
            <View>
              <AddBook
                visible={this.state.addBookVisible}
                onModalClosed={this.hideAddBook}
              />
            </View>
          ) : (
            <View></View>
          )}

          {this.state.bookSelected ? (
            <View>
              <ReservationDetails
                visible={this.state.reservationVisible}
                onModalClosed={this.hideReservation}
                book={this.state.bookSelected}
                borrower={this.state.bookSelected.borrower}
              />
            </View>
          ) : (
            <View></View>
          )}
        </Container>
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
  },
  textInfo: {
    fontSize:12
  },
  gridView: {
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 15,
    padding: 5,
    width: "90%",
    alignSelf: "center"
  },
  ImageIconStyle: {
    padding: 2,
    margin: 2,
    height: 30,
    width: 30
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
