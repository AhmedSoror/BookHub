import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import CircleButton from "react-native-circle-button";

import BookCard from "./BookCard";
import AddBook from "./AddBook";

class UserBook extends Component {
  static navigationOptions = {
    title: "My books"
  };
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      reservationVisible: false
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

  render() {
    return (
      <View style={styles.container}>
        <BookCard title="Oliver Twist" />
        <View
          style={{ flex: 1, position: "absolute", bottom: "2%", right: "2%" }}
        >
          <CircleButton
            size={45}
            onPressButtonRight={() => {
              this.showDetails(item);
            }}
          />
        </View>
        <AddBook
          visible={this.state.reservationVisible}
          onModalClosed={this.hideDetails}
           
        />
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
    token: state.login.authToken
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserBook);
