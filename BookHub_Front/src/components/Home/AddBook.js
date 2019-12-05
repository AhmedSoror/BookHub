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

  async addBook(item) {
    const payload = {
      bookId: item.id,
      borrowerName: this.props.borrowerName,
      phoneNumber: this.props.phoneNumber,
      borrowDays: this.props.borrowDays
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
    let modalContent = null;
    if (this.props.item) {
      modalContent = (
        <View>
          <Text>{"Book Name:"}</Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            editable={this.props.item.reserved == 0}
            onChangeText={txt => {
              this.setState({ bookName: txt });
            }}
            //returnKeyType="next"
            //onSubmitEditing={() => this.phoneInput.focus()}
            // ref={input => (this.phoneInput = input)}
          />
        </View>
      );
    }
    return (
      <Modal
        onRequestClose={this.props.onAddBookModalClosed}
        visible={this.props.isAddBookVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {modalContent}
          <View style={{ marginTop: 15 }}>
            <Button
              style={styles.Button}
              title={"Confirm"}
              color={"green"}
              visible={this.props.item}
              onPress={() => {
                if (this.props.item.reserved == 0) {
                  //this.addBook.bind(this);        // axios reserve the book
                } else {
                  //this.unReserveBook(this);      // axios cancel book reservation
                }
              }}
            />

            <Button
              style={styles.Button}
              title="Cancel"
              onPress={this.props.onAddBookModalClosed}
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
    // marginTop: "5%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    marginTop: 15,
    width: "80%"
  }
});
