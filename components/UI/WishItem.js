import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';

import Colors from '../../constants/Colors';

const WishItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={props.onSelectWish}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {props.title}
        </Text>
        <Text style={styles.text}>{props.text}</Text>
        <Text style={styles.price}>
          Pris:
{props.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WishItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 9,
  },
  price: {
    padding: 5,
    fontFamily: 'chilanka-regular',
  },
  text: {
    fontSize: 20,
    fontFamily: 'purisa',
    padding: 5,
  },
  title: {
    backgroundColor: Colors.accent,
    fontFamily: 'chilanka-regular',
    fontSize: 35,
    textAlign: 'center',
  },
});
