import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
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
axios.defaults.baseURL = "http://172.17.0.2:3000/";

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
                      <Text>{book.title}</Text>
                      <Text note numberOfLines={3}>
                        {book.reserved ? "Reserved" : "Available"}
                      </Text>
                    </TouchableOpacity>
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
                        this.setState({
                          bookSelected: book
                        });
                        this.showReservation();
                      }}
                    >
                      <Text>{book.reserved?"Unreserve":"Reserve"}</Text>
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
              iconButtonLeft={require("../../../assets/refresh.png")}
              iconButtonRight={require("../../../assets/add.png")}
              iconButtonBottom={require("../../../assets/logout.png")}
              // iconButtonTop={require("../../../assets/icon.png")}
              onPressButtonRight={() => {
                this.showAddBook();
              }}
              onPressButtonLeft={() => {
                this.fetchBooks();
                console.log("MyBooks Line 190");
              }}
              onPressButtonBottom={()=>{
                this.props.navigation.navigate("Login");
              }

              }
            />
          </View>
          {this.props.user? (
            <View>
              <AddBook
                visible={this.state.addBookVisible}
                onModalClosed={this.hideAddBook}
                user={this.props.user}
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
