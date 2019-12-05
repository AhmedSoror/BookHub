import React, { Component } from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TextInput
} from "react-native";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: ""
    };
  }

  async addBook() {
    const payload = {
      bookName: this.state.bookName
      //ownerId:this.props.userId,
    };
    console.log(`${payload.borrowerName}///////${payload.borrowerName}`);
    await axios
      .post("/books/reserve", { payload }) //////////////*************************************** */
      // .post("http://localhost:3000/books/reserve", { payload })
      .then(response => {
        console.log("received data from axios:");
        console.log(response);
        if (response.status === 200) {
        }
      })
      .catch(error => {
        console.log(`error: ${error}`);
        // console.log(error.response.status);
        // if (error.response.status === 404) {
        //   Alert.alert("Wrong username or password");
        // }
      });
  }

  render() {
    return (
      <Modal
        onRequestClose={this.props.onModalClosed}
        visible={this.props.visible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View>
            <Text>{"Book Name :"}</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              onChangeText={txt => {
                this.setState({ bookName: txt });
              }}
              //returnKeyType="next"
              //onSubmitEditing={() => this.phoneInput.focus()}
              // ref={input => (this.phoneInput = input)}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              style={styles.Button}
              title={"Confirm"}
              color={"green"}
              onPress={() => {
                //this.addBook.bind(this);        // axios reserve the book
              }}
            />

            <Button
              style={styles.Button}
              title="Cancel"
              onPress={this.props.onModalClosed}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  input: {
    // textAlign: "center",
    // width: "100%",
    paddingLeft: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    margin: 15,
    width: "80%"
  }
});
