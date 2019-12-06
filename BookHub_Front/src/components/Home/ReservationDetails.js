import React, { Component } from "react";
import {
  Modal,
  View,
  Alert,
  Text,
  Button,
  StyleSheet,
  TextInput
} from "react-native";
import axios from "axios";
axios.defaults.baseURL = "http://172.17.0.2:3000/";

export default class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowerName: "",
      borrowerEmail: "",
      phoneNumber: ""
    };
  }

  async reserveBook() {
    console.log("3213535");
    await axios
      .put(`/books/${this.props.book._id.$oid}`, {
        reserved: 1,
        email: this.state.borrowerEmail,
        phone_number: this.state.phoneNumber
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          Alert.alert("Book is updated successfully");
          console.log("updated successfully");
        }
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  }

  async unReserveBook() {
    console.log("line 45");
    await axios
      .put(`/books/${this.props.book._id.$oid}`, {
        reserved: 0,
        email: this.props.user.email
      })
      .then(response => {
        if (response.status === 200) {
          Alert.alert("Book is updated successfully");
          console.log("unreserved successfully");
        }
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  }

  actionButtonFunction = () => {
    if (this.props.book.reserved == 0) {
      console.log("line 143");
      this.reserveBook(); // axios reserve the book
      // this.reserveBook(this.props.book);
    } else {
      console.log("line 147");
      this.unReserveBook(); // axios cancel book reservation
      // this.unReserveBook(this.props.book);
    }
    console.log("line 151");
    this.props.onModalClosed();
  };
  render() {
    let modalContent = null;
    if (this.props.book) {
      modalContent = (
        <View>
          <Text style={styles.text}>{"Borrower name:"}</Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            editable={this.props.book.reserved == 0}
            defaultValue={
              this.props.book.reserved == 1
                ? this.props.borrower.name
                  ? this.props.borrower.name
                  : "loading ...."
                : ""
            }
            onChangeText={text => this.setState({ borrowerName: text })}
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />

          <Text style={styles.text}>{"Email:"}</Text>
          <TextInput
            style={styles.input}
            editable={this.props.book.reserved == 0}
            defaultValue={
              this.props.book.reserved == 1 ? this.props.borrower.email : ""
            }
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            onChangeText={txt => {
              this.setState({ borrowerEmail: txt });
            }}
            ref={input => (this.emailInput = input)}
            returnKeyType="next"
            onSubmitEditing={() => this.phoneInput.focus()}
          />
          <Text style={styles.text}>{"Phone Number:"}</Text>
          <TextInput
            style={styles.input}
            editable={this.props.book.reserved == 0}
            defaultValue={
              this.props.book.reserved == 1
                ? this.props.borrower.phone_number
                : ""
            }
            keyboardType={"phone-pad"}
            onChangeText={txt => {
              this.setState({ phoneNumber: txt });
            }}
            ref={input => (this.phoneInput = input)}
          />
        </View>
      );
    }
    return (
      <Modal
        onRequestClose={this.props.onModalClosed}
        visible={this.props.visible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {modalContent}
          <View style={{ marginTop: 15 }}>
            <Button
              style={styles.Button}
              title={
                this.props.book
                  ? this.props.book.reserved == 1
                    ? "Delete"
                    : "Confirm"
                  : ""
              }
              color={
                this.props.book
                  ? this.props.book.reserved == 1
                    ? "red"
                    : "green"
                  : "blue"
              }
              visible={this.props.book}
              onPress={this.actionButtonFunction}
            />

            <Button
              style={styles.Button}
              title="Close"
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
    marginTop: 15,
    width: "80%"
  },
  text: {
    fontSize: 20
  }
});
