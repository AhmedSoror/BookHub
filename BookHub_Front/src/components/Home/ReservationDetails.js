import React, { Component } from "react";
import { connect } from "react-redux";
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
import { URL } from "../../../config/config.js";
axios.defaults.baseURL = URL;

class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowerName: "",
      borrowerEmail: "",
      phoneNumber: "",
      ValidEmail: false
    };
  }

  async reserveBook() {
    await axios
      .put(`/books/${this.props.book._id.$oid}`, {
        reserved: 1,
        email: this.state.borrowerEmail,
        phone_number: this.state.phoneNumber
      })
      .then(response => {
        if (response.status === 200) {
          Alert.alert("Book is updated successfully");
          this.props.onModalClosed();
        }
      })
      .catch(error => {
        Alert.alert("There is no user registered with this email!");
        console.log(`reserve error: ${error}`);
      });
  }

  async unReserveBook() {
    await axios
      .put(`/books/${this.props.book._id.$oid}`, {
        reserved: 0,
        email: this.props.user.email
      })
      .then(response => {
        if (response.status === 200) {
          Alert.alert("Book is now available");
          this.props.onModalClosed();
        }
      })
      .catch(error => {
        console.log(`unreserve error: ${error}`);
      });
  }

  actionButtonFunction = () => {
    if (this.props.book.reserved == 0) {
      this.reserveBook();
    } else {
      this.unReserveBook();
    }
  };

  validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ ValidEmail: false });
      return false;
    } else {
      this.setState({ borrowerEmail: text, ValidEmail: true });
    }
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
          <Text style={styles.invalidEmail}>
            {this.state.borrowerName? "" : "* Please enter a name!"}
          </Text>
          <Text style={styles.text}>{"Email:"}</Text>
          <TextInput
            style={styles.input}
            editable={this.props.book.reserved == 0}
            defaultValue={
              this.props.book.reserved == 1 ? this.props.borrower.email : ""
            }
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            // onChangeText={txt => {this.setState({ borrowerEmail: txt });}}
            onChangeText={text => this.validate(text)}
            ref={input => (this.emailInput = input)}
            returnKeyType="next"
            onSubmitEditing={() => this.phoneInput.focus()}
          />
          <Text style={styles.invalidEmail}>
            {this.state.borrowerEmail?(this.state.ValidEmail ? "" : "* Email is not valid!!"):"* Please enter a valid email!"}
          </Text>
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
          <Text style={styles.invalidEmail}>
            {this.state.phoneNumber? "" : "* Please enter a phone number!"}
          </Text>
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
              disabled={
                this.props.book
                  ? this.props.book.reserved == 1
                    ? false
                    : this.state.borrowerName != "" &&
                      this.state.borrowerEmail != "" &&
                      this.state.phoneNumber != ""
                    ? false
                    : true
                  : true
              }
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
  },
  invalidEmail: {
    fontSize: 10,
    color: "red"
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
export default connect(mapStateToProps, mapDispatchToProps)(ReservationDetails);
