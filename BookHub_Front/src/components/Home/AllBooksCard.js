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

const createBook = () => {
  item = {
    key: 0,
    name: `Oliver Twist Book`,
    owner: `Ali Mohammed`,
    reserved: 0,
    ownerEmail: "ali@gmail.com",
    color: this.reserved == 1 ? "#757575" : "#75e900"
  };
  return item;
};

export default class SimpleDetailedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      reservationVisible: false,
      book: createBook()
    };
  }

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
            title={this.props.title}
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
              style={[styles.itemContainer, { backgroundColor: item.color }]}
              onPress={() => {
                // this.showDetails(item);
              }}
            >
              <Text
                style={[
                  styles.itemName,
                  { color: this.state.book.reserved == 1 ? "white" : "black" }
                ]}
              >
                {`Owner: ${this.state.book.owner}`}
              </Text>
              <Text
                style={[
                  styles.itemName,
                  { color: this.state.book.reserved == 1 ? "white" : "black" }
                ]}
              >
                {`Owner Email: ${this.state.book.ownerEmail}`}
              </Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
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
    height: "100%",
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
    height: Dimensions.get("window").width // approximate a square
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
