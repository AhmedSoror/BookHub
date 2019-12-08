import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, FlatList, Image } from "react-native";
// import { Button } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
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
axios.defaults.baseURL = "http://172.17.0.2:3000/";

import BookCard from "./BookCard";
import AddBook from "./AddBook";
import ReservationDetails from "./ReservationDetails";

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
      loading: true,
      isCollapsed: true,
      bookInfoCollapsed: true,
      addBookVisible: false,
      bookDetailsVisible: false,
      reservationVisible: false,
      bookSelected: null,
      bookSelectedBorrower: null,
      // bookList: createBooks()
      bookList: null
    };
  }
  async getBorrower(book) {
    await axios
      // .get(`/users/${this.state.bookSelected.borrower_id.$oid}`)
      .get(`/users/${book.borrower_id.$oid}`)
      .then(response => {
        this.setState({
          bookSelected: book,
          bookDetailsVisible: true,
          bookSelectedBorrower: response.data
        });
      })
      .catch(error => {
        console.log(`MyBooks L93 error: ${error}`);
      });
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../../node_modules/native-base/Fonts/Roboto.ttf"),

      Roboto_medium: require("../../../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
    // console.log(`/user_books/${this.props.user._id.$oid}`);
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
          console.log("MyBooks L130 ", bookItem);
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
      console.log("MyBooks L132 ", this.state.bookList);
    }
    // updateBookBorrowers(newBookList);
  }
  updateBookBorrowers(newBookList) {
    this.setState({
      bookList: newBookList
    });
  }

  hideAddBook = () => {
    this.setState({
      addBookVisible: false
    });
  };
  showAddBook() {
    this.setState({
      addBookVisible: true
    });
  }
  hideBookDetails = () => {
    this.setState({
      bookDetailsVisible: false
    });
  };
  showBookDetails() {
    this.setState({
      bookDetailsVisible: true
    });
  }

  hideDetails = () => {
    this.setState({
      reservationVisible: false
    });
  };
  showDetails(item) {
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
                    {/* <Thumbnail
                      square
                      source={{ uri: "../../../assets/google_login.png" }}
                    /> */}
                    <Image
                      source={require("../../../assets/book.png")}
                      style={styles.ImageIconStyle}
                    />
                  </Left>
                  <Body>
                    <Text>{book.title}</Text>
                    <Text note numberOfLines={3}>
                      {book.reserved ? "Reserved" : "Available"}
                    </Text>
                    <Collapsible
                      collapsed={
                        book.isCollapsed == undefined ? true : book.isCollapsed
                      }
                    >
                      <Text>
                        {book.reserved == 1
                          ? book.borrower
                            ? `${book.borrower.name}`
                            : ""
                          : "0"}
                      </Text>
                    </Collapsible>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={async () => {
                        newBooks = this.state.bookList;
                        for (i = 0; i < newBooks.length; i++) {
                          if (newBooks[i]._id.$oid == book._id.$oid) {
                            newBooks[i].isCollapsed = !newBooks[i].isCollapsed;
                          }
                        }

                        await this.setState({ bookList: newBooks });
                        console.log(this.state.bookList);
                        // await this.setState({
                        //   bookInfoCollapsed: !this.state.bookInfoCollapsed
                        // });
                        // console.log("MyBooks L164: ", this.state);
                      }}
                    >
                      <Text>View</Text>
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
              onPressButtonRight={() => {
                this.showAddBook();
              }}
            />
          </View>
          <View>
            <AddBook
              visible={this.state.addBookVisible}
              onModalClosed={this.hideAddBook}
              user={this.props.user}
            />
          </View>
          {this.state.bookSelected ? (
            <View>
              {/* <BookCard
                visible={this.state.bookDetailsVisible}
                onModalClosed={this.hideBookDetails}
                book={this.state.bookSelected}
                borrower={this.state.bookSelectedBorrower}
              /> */}
              <ReservationDetails
                visible={this.state.reservationVisible}
                onModalClosed={this.hideDetails}
                book={this.state.bookSelected}
                borrower={this.state.bookSelectedBorrower}
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
    width: 30,
    // resizeMode: "stretch"
  },
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
