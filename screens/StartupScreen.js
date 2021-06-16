/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "firebase";

import Colors from "../constants/Colors";

/**
 * StartUpscreen.
 * Chooses between login screen if user is logged out or Main screen if user is logged in
 */
const StartupScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          props.navigation.navigate("Wishes");
        } else {
          props.navigation.navigate("Auth");
        }
      });
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
