import React, { useState } from 'react';
import {
  Image, View, Text, StyleSheet, Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import DefaultText from '../../components/UI/DefaultText';

import * as wishesActions from '../../store/actions/wishesActions';
import Colors from '../../constants/Colors';

const WishDetailScreen = (props) => {
  console.log('WishDetailScreen');

  const [error, setError] = useState();

  const dispatch = useDispatch();

  const availableWishes = useSelector((state) => { return state.wishes.availableWishes; });
  const wishId = props.navigation.getParam('wishId');

  const selectedWish = availableWishes.find((wish) => {
    return wish.id === wishId;
  });

  console.log("selectedWish ---------", selectedWish)
  if (!selectedWish) {
    props.navigation.goBack();
  }

  const onPressHandler = async () => {
    console.log("props.navigation", props.navigation)
    setError(null);
    try {
      await dispatch(wishesActions.deleteWish(wishId));
      props.navigation.navigate('PeopleWishes');
    } catch (err) {
      console.log('error, err -------', err);
      setError(err.message);
    }
  };

  if (error) {
    return <View>{error}</View>;
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
        <View style={styles.buttonContainer}>
          <View style={styles.buttonShadow}>
            <Text onPress={onPressHandler} style={styles.button}>Opdater Ønske</Text>
          </View>
          <View style={styles.buttonShadow}>
            <Text onPress={onPressHandler} style={styles.button}>Slet Ønske</Text>
          </View>
        </View>
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
  button: {
    fontFamily: 'chilanka-regular',
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
    overflow: 'hidden',
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    fontFamily: 'chilanka-regular',
    fontSize: 45,
  },
  buttonShadow: {
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 10,
    elevation: 5,
    padding: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },
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
