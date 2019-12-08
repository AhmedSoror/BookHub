import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, FlatList } from "react-native";
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
import { AppLoading } from "expo";
import * as Font from "expo-font";

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
      loading: true,
      isCollapsed: true,
      addBookVisible: false,
      bookDetailsVisible: false,
      bookSelected: null,
      bookList: createBooks()
      // bookList: null
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../../../node_modules/native-base/Fonts/Roboto.ttf"),

      Roboto_medium: require("../../../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
    await axios
      .get(`/user_books/${this.props.user.id}`)
      .then(response => {
        this.setState({
          bookList: response.data
        });
      })
      .catch(error => {
        console.log(`my books error: ${error}`);
      });
  }

  async componentDidMountOld() {
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
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return <BookCard book={item} key={item._id.$oid} />;
  };

  viewButtonAction = book => {
    console.log("MyBooks L160: ", book);
    this.setState({
      bookSelected: book,
      bookDetailsVisible: true
    });
    console.log("MyBooks L164: ", this.state.bookSelected);
    // this.showBookDetails();
  };

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
                    <Thumbnail
                      square
                      source={{ uri: "../../../assets/book.png" }}
                    />
                  </Left>
                  <Body>
                    <Text>{book.title}</Text>
                    <Text note numberOfLines={3}>
                      {book.reserved ? "Reserved" : "Available"}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={async() => {
                        console.log("MyBooks L160: ", book);
                       await this.setState({
                          bookSelected: book,
                          bookDetailsVisible: true
                        });
                        console.log("MyBooks L164: ", this.state);
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
          <View>
            <BookCard
              visible={this.state.bookDetailsVisible}
              onModalClosed={this.hideBookDetails}
              book={this.state.bookSelected}
            />
          </View>
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
