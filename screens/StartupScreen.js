/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';

const StartupScreen = (props) => {
  console.log('StartUpScreen');

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      console.log('StartUpScreen, useEffect');

      const userData = useSelector((state) => {
        return state.auth.user_obj;
      });
      console.log("Login - userData", userData)
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }

      props.navigation.navigate('Wishes');
      // dispatch(authActions.authenticate(userData));
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
