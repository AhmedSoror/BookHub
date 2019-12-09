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
import { URL } from "../../../config/config.js";
axios.defaults.baseURL = URL;
// axios.defaults.baseURL = "http://172.17.0.2:3000/";



class AllBooks extends Component {
  static navigationOptions = {
    title: "All books"
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
    // this.fetchBooks();
  }
  async fetchBooks() {
    await axios
      .get("/books")
      .then(response => {
        this.setState({
          bookList: response.data
        });
      })
      .catch(error => {
        console.log(`all books error: ${error}`);
      });

    var newList = this.state.bookList;
    flag = 0;
    for (i = 0; i < newList.length; i++) {
      bookItem = newList[i];
      await axios
        // .get(`/users/${bookItem.borrower_id.$oid}`)
        .get(`/users/${bookItem.owner_id.$oid}`)
        .then(response => {
          bookItem.owner = response.data;
          bookItem.isCollapsed = true;
          newList[i] = bookItem;
        })
        .catch(error => {
          console.log(`AllBooks L135 error: ${error}`);
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
                        {book.owner ? `Owner: ${book.owner.name}\nEmail: ${book.owner.email}` : "loading..."}
                      </Text>
                    </Collapsible>
                  </Body>
                  
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
              iconButtonRight={null}
              iconButtonLeft={null}

              onPressButtonTop={() => {
                this.fetchBooks();
              }}
              onPressButtonBottom={() => {
                this.props.navigation.navigate("Login");
              }}
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
export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
