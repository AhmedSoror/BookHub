import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import axios from "axios";
axios.defaults.baseURL = "http://172.17.0.2:3000/";

import Collapsible from "react-native-collapsible";
import { Button } from "react-native-elements";
import ReservationDetails from "./ReservationDetails";

// set the state of borrowerName and borrowerPhone
export default class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      reservationVisible: false,
      borrower: null
    };
  }
  async componentDidMount() {
    console.log("BookCard L31: ", this.props.book);
    if (this.props.book) {
      await axios
        .get(`/users/${this.props.book.borrower_id.$oid}`)
        .then(response => {
          this.setState({
            borrower: response.data
          });
        })
        .catch(error => {
          console.log(`book card error: ${error}`);
        });
    }
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
    if (this.props.book) {
      return (
        <Modal
          onRequestClose={this.props.onModalClosed}
          visible={this.props.visible}
          animationType="slide"
        >
          <View style={styles.container}>
            <View style={styles.gridView}>
              {this.state.borrower ? (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor:
                        this.props.book.reserved == 1 ? "#757575" : "#75e900"
                    }
                  ]}
                  onPress={() => {
                    this.showDetails(this.props.book);
                  }}
                >
                  <Text
                    style={[
                      styles.itemName,
                      {
                        color: this.props.book.reserved == 1 ? "white" : "black"
                      }
                    ]}
                  >
                    {/* create method to get borrow name */}
                    {`Borrower Name: ${
                      this.props.book.reserved == 1
                        ? this.state.borrower.name
                        : "-"
                    }`}
                  </Text>
                  <Text
                    style={[
                      styles.itemName,
                      {
                        color: this.props.book.reserved == 1 ? "white" : "black"
                      }
                    ]}
                  >
                    {`Borrower Email: ${
                      this.props.book.reserved == 1
                        ? this.state.borrower.email
                        : "-"
                    }`}
                  </Text>
                  <Text
                    style={[
                      styles.itemName,
                      {
                        color: this.props.book.reserved == 1 ? "white" : "black"
                      }
                    ]}
                  >
                    {`Phone Number: ${
                      this.props.book.reserved == 1
                        ? this.state.borrower.phone_number
                        : "-"
                    }`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text>{"Loading ...."}</Text>
              )}
            </View>
            <ReservationDetails
              visible={this.state.reservationVisible}
              onModalClosed={this.hideDetails}
              book={this.props.book}
              borrower={this.state.borrower}
            />
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          onRequestClose={this.props.onModalClosed}
          visible={this.props.visible}
          animationType="slide"
        >
          <View>
            <Text>Loading.....</Text>
          </View>
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    marginTop: 20,
    width: "100%",
    alignContent: "center"
  },
  buttonView: {
    alignSelf: "center"
  },
  gridView: {
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 15,
    padding: 5,
    width: "90%",
    alignSelf: "center"
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    padding: 1,
    margin: 1,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff"
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width
  },

  reservedItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff"
  },
  itemName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    textAlign: "center"
  },

  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff"
  }
});
