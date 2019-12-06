import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  View,
  Image,
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
      bookName: "",
    };
  }

  async addBook() {
    console.log(this.props.user);
    await axios
      .post(`/books/`, {
        "title":this.state.bookName,
        "author": "",
        "owner": this.props.user.id,
        "reserved": 0,
        "borrower": this.props.user.id        
      })
      .then(response => {
        if (response.status === 200) {
          Alert.alert("Book added successfully");
          this.props.onModalClosed
        }
      })
      .catch(error => {
        console.log(`add book error: ${error}`);
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
            <Text style={styles.titleText}>{"Add new Book"}</Text>
            <Text style={{fontSize: 20}}>{"Book Name :"}</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              onChangeText={txt => {
                console.log("add book L60 ",this.props.user);
                this.setState({ bookName: txt });
              }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              style={styles.Button}
              title={"Confirm"}
              color={"green"}
              onPress={this.addBook}
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
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
  },
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