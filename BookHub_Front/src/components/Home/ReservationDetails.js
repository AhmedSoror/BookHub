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

export default class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowerName: "",
      borrowerEmail: "",
      phoneNumber: ""
    };
  }

  async reserveBook(book) {
    const payload = {
      bookId: book.id,
      borrowerName: book.borrowerName,
      borrowerEmail: book.borrowerEmail,
      phoneNumber: book.phoneNumber
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
  async unReserveBook(book) {
    const payload = {
      bookId: book.id
    };
    console.log(`${bookId}`);
    await axios
      .post("/books/unReserve", { payload }) //////////////*************************************** */
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
    if (this.props.book) {
      modalContent = (
        <View>
          <Text style={styles.text}>{"Borrower name:"}</Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            editable={this.props.book.reserved == 0}
            value={
              this.props.book.reserved == 1
                ? this.props.borrower.name
                  ? this.props.borrower.name
                  : "loading ...."
                : ""
            }
            onChangeText={txt => {
              this.setState({ borrowerName: txt });
            }}
            returnKeyType="next"
            onSubmitEditing={() => this.phoneInput.focus()}
          />

          <Text style={styles.text}>{"Email:"}</Text>
          <TextInput
            style={styles.input}
            editable={this.props.book.reserved == 0}
            value={
              this.props.book.reserved == 1 ? this.props.borrower.email : ""
            }
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            onChangeText={txt => {
              this.setState({ borrowerEmail: txt });
            }}
            ref={input => (this.phoneInput = input)}
            returnKeyType="next"
            onSubmitEditing={() => this.daysInput.focus()}
          />
          <Text style={styles.text}>{"Phone Number:"}</Text>
          <TextInput
            style={styles.input}
            editable={this.props.book.reserved == 0}
            value={
              this.props.book.reserved == 1
                ? this.props.borrower.phone_number
                : ""
            }
            keyboardType={"phone-pad"}
            onChangeText={txt => {
              this.setState({ phoneNumber: txt });
            }}
            ref={input => (this.phoneInput = input)}
            returnKeyType="next"
            onSubmitEditing={() => this.daysInput.focus()}
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
              onPress={() => {
                if (this.props.book.reserved == 0) {
                  //this.reserveBook.bind(this);        // axios reserve the book
                } else {
                  //this.unReserveBook(this);      // axios cancel book reservation
                }
              }}
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
