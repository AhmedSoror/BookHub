import React, { Component } from "react";
import { connect  } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import BookCard from "./BookCard";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "My books"
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      isDateTimePickerVisible: false
    };
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    console.log(`token: ${this.props.token}`)
    this.hideDateTimePicker();
  };
  render() {
    return (
      <View style={styles.container}>
        <BookCard title="Oliver Twist" />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20
  }
});

const mapStateToProps = state => {
  return {
    token: state.login.authToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {    
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (HomeScreen)