/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';

/**
 * StartUpscreen.
 * Chooses between login screen if user is logged out or Main screen if user is logged in
 */
const StartupScreen = (props) => {
  console.log('StartUpScreen');

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      console.log('StartUpScreen, useEffect');

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          props.navigation.navigate('Wishes');
          console.log('StartupScreen - user', user.uid);
          // dispatch(authActions.authenticate(user));
        } else {
          props.navigation.navigate('Auth');
          // dispatch(authActions.LOGOUT);
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
