import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import configureStore from "./src/store/configureStore";
import App from "./App/App";

const store = configureStore();
export default class PlaygroundApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
