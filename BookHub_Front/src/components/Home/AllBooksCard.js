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
import axios from "axios";
axios.defaults.baseURL = "http://172.17.0.2:3000/";

import Collapsible from "react-native-collapsible";
import { Button } from "react-native-elements";

export default class AllBooksCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      reservationVisible: false,
      owner: null
      // book: createBook()
    };
  }
  async componentDidMount() {
    // console.log(this.props.book.owner_id.$oid);
    await axios
      .get(`/users/${this.props.book.owner_id.$oid}`)
      .then(response => {
        // console.log(response.data);
        this.setState({
          owner: response.data
        });
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
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
            {this.state.owner ? (
              <View>
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor:
                        this.props.book.reserved == 1 ? "#757575" : "#75e900"
                    }
                  ]}
                  onPress={() => {
                    // this.showDetails(item);
                    console.log(this.state.owner.email);
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
                    {`Owner Name: ${this.state.owner.name}`}
                  </Text>
                  <Text
                    style={[
                      styles.itemName,
                      {
                        color: this.props.book.reserved == 1 ? "white" : "black"
                      }
                    ]}
                  >
                    {`Owner Email: `}
                  </Text>
                  <Text
                    style={[
                      styles.itemName,
                      {
                        color:
                          this.props.book.reserved == 1 ? "white" : "black",
                        textAlign: "center"
                      }
                    ]}
                  >
                    {`${this.state.owner.email}`}
                  </Text>
                  <Text
                    style={[
                      styles.itemName,
                      {
                        color: this.props.book.reserved == 1 ? "white" : "black"
                      }
                    ]}
                  >
                    {this.props.book.reserved == 1 ? "Reserved" : "Available"}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text>{"Loading ...."}</Text>
            )}
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
    //alignItems: "center",
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
    textAlign: "left"
  },

  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff"
  }
});
