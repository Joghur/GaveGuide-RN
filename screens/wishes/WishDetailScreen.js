/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  Image, View, Text, StyleSheet, Linking,
} from 'react-native';
import { useSelector } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import DefaultText from '../../components/UI/DefaultText';

import Colors from '../../constants/Colors';

const WishDetailScreen = (props) => {
  console.log('WishDetailScreen');

  const availableWishes = useSelector((state) => { return state.wishes.availableWishes; });
  const wishId = props.navigation.getParam('wishId');

  const selectedWish = availableWishes.find((wish) => {
    return wish.id === wishId;
  });

  if (typeof selectedWish === 'undefined') {
    props.navigation.goBack();
  }

  if (selectedWish.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No wish found!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.details}>
        <Text style={styles.title}>{selectedWish.title}</Text>
        <Image
          source={{ uri: selectedWish.imageUri }}
          style={styles.image}
        />
        <Text style={styles.text}>{selectedWish.text}</Text>
        <DefaultText style={styles.price}>
          Pris:
{selectedWish.price}
        </DefaultText>
        <Text
          style={styles.link}
          onPress={() => {
            Linking.openURL(selectedWish.url);
          }}
        >
          Tryk her for at se mere
        </Text>
      </View>
    </ScrollView>
  );
};

WishDetailScreen.navigationOptions = (navigationData) => {
  const wishOwnerName = navigationData.navigation.getParam('wishOwnerName');

  return {
    headerTitle: `Ønske fra ${wishOwnerName}`,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  details: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 10,
    elevation: 5,
  },
  link: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 30,
    color: 'blue',
    fontFamily: 'chilanka-regular',
  },
  price: {

  },
  text: {
    fontSize: 20,
    fontFamily: 'purisa',
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'chilanka-regular',
    fontSize: 35,
    backgroundColor: Colors.accent,
    textAlign: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default WishDetailScreen;
