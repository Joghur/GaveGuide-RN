import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DefaultText = (props) => {
  console.log('DefaultText');
  return <Text style={styles.text}>{props.children}</Text>;
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'cutivemono',
    fontSize: 15,
  },
});
