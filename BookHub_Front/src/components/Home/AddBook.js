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
axios.defaults.baseURL = "http://172.17.0.2:3000/";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: ""
    };
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
            <Text style={styles.titleText}>{"Add new Book"}</Text>
            <Text style={{ fontSize: 20 }}>{"Book Name :"}</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              onChangeText={txt => {
                this.setState({ bookName: txt });
              }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              style={styles.Button}
              title={"Confirm"}
              color={"green"}
              onPress={async () => {
                await axios
                  .post(`/books/`, {
                    title: this.state.bookName,
                    author: "",
                    owner: this.props.user._id.$oid,
                    reserved: 0,
                    borrower: this.props.user._id.$oid
                  })
                  .then(response => {
                    if (response.status === 201) {
                      Alert.alert("Book added successfully");
                      this.props.onModalClosed();
                    }
                  })
                  .catch(error => {
                    console.log(`add book error: ${error}`);
                  });
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
    marginTop: 15,
    width: "80%"
  },
  text: {
    fontSize: 20
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
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
