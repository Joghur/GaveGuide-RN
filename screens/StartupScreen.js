/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';

const StartupScreen = (props) => {
  console.log('StartUpScreen');

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      console.log('StartUpScreen, useEffect');
      const userData = await AsyncStorage.getItem('userData');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      // console.log("StartUpScreen, useEffect, userData", userData)
      // console.log("StartUpScreen, useEffect, refreshToken", refreshToken)

      if (!userData) {
        if (!refreshToken) {
          // console.log("StartUpScreen, useEffect, !refreshToken")
          props.navigation.navigate('Auth');
          return;
        }
        dispatch(authActions.refresh(refreshToken));
      }
      const transformedData = await JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      // console.log("StartUpScreen, transformedData", transformedData)
      const expirationDate = new Date(expiryDate);
      // console.log("StartUpScreen, expirationDate", expirationDate)

      if (expirationDate <= new Date() || !token || !userId) {
        // console.log("StartUpScreen, expirationDate <= new Date()", expirationDate)
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('Wishes');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

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
