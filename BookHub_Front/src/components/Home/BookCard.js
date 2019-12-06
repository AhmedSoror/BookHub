import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";

import Collapsible from "react-native-collapsible";
import { Button } from "react-native-elements";
import ReservationDetails from "./ReservationDetails";

// set the state of borrowerName and borrowerPhone
export default class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      reservationVisible: false,
      
    };
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
    return (
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <Button
            title={this.props.book.title}
            onPress={() => {
              this.setState({
                isCollapsed: !this.state.isCollapsed
              });
            }}
          />
        </View>

        <Collapsible collapsed={this.state.isCollapsed}>
          <View style={styles.gridView}>
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: this.props.book.reserved == 1 ? "#757575" : "#75e900" }]}
              onPress={() => {
                this.showDetails(this.props.book);
              }}
            >
              <Text
                style={[
                  styles.itemName,
                  { color: this.props.book.reserved == 1 ? "white" : "black" }
                ]}
              >
                {/* create method to get borrow name */}
                {`Borrower Name: ${this.state.borrowerName}`}     
              </Text>
              <Text
                style={[
                  styles.itemName,
                  { color: this.props.book.reserved == 1 ? "white" : "black" }
                ]}
              >
                {`Phone Number: ${this.state.borrowerPhoneNumber}`}
              </Text>
               
            </TouchableOpacity>
          </View>
        </Collapsible>
        <ReservationDetails
          visible={this.state.reservationVisible}
          onModalClosed={this.hideDetails}
          item={this.props.book}
        />
      </View>
    );
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
