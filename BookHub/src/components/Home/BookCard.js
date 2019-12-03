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

const numColumns = 3;
const formatData = (numColumns, itemColor) => {
  items = [];
  for (i = 0; i < 24; i++) {
    suffix = i < 12 ? "am" : "pm";
    start = i % 12 == 0 ? 12 : i % 12;
    end = (i + 1) % 12 == 0 ? 12 : (i + 1) % 12;
    items.push({
      key: i,
      name: `${start} - ${end} ${suffix}`,
      color: itemColor,
      reservationLevel: 0
    });
  }
  const numberOfFullRows = Math.floor(items.length / numColumns);
  let numberOfElementsLastRow = items.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    items.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return items;
};
const createBook = () => {
  items = [];
  items.push({
    key: 0,
    name: `Oliver Twist Book`,
    owner: `Ali Mohammed`,
    availableDate: `18/5/2019`,
    reserved: 0,
    color: this.reserved == 1 ? "#757575" : "#75e900"
  });
  return items;
};

export default class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      reservationVisible: false,
      booksList: createBook()
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

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: item.color }]}
        onPress={() => {
      
          this.showDetails(item);
        }}
      >
        <Text
          style={[
            styles.itemName,
            { color: item.reserved == 1 ? "white" : "black" }
          ]}
        >
          {`Owner: ${item.owner}`}
        </Text>
        <Text
          style={[
            styles.itemName,
            { color: item.reserved == 1 ? "white" : "black" }
          ]}
        >
          {`Availability date: ${item.availableDate}`}
        </Text>

      </TouchableOpacity>
    );
  };

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
          <FlatList
            data={this.state.booksList}
            style={styles.gridView}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
        </Collapsible>
        <ReservationDetails
          visible={this.state.reservationVisible}
          onModalClosed={this.hideDetails}
          item={this.state.selectedItem}
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
    height: Dimensions.get("window").width / numColumns // approximate a square
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
