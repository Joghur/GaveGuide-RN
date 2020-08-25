/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  FlatList, View, StyleSheet, Text, Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import WishItem from './WishItem';
import * as wishesActions from '../../store/actions/wishesActions';
import Colors from '../../constants/Colors';

const WishList = (props) => {
  console.log('WishList');

  const dispatch = useDispatch();
  const users = useSelector((state) => { return state.users.availableUsers; });

  const deleteHandler = (id) => {
    console.log('WishDetailScreen - deleteHandler, id', id);
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(wishesActions.deleteWish(id));
        },
      },
    ]);
  };

  const renderWishItem = (itemData) => {
    const wishUserId = itemData.item.ownerId;
    const wishUser = users.find((user) => { return user.id === wishUserId; });
    let name;
    if (wishUser) {
      name = wishUser.name;
    }

    // console.log("itemData", itemData)
    return (
      <>
        <WishItem
          title={itemData.item.title}
          text={itemData.item.text}
          price={itemData.item.price}
          url={itemData.item.url}
          image={itemData.item.imageUri}
          onSelectWish={() => {
            props.navigation.navigate({
              routeName: 'WishDetail',
              params: {
                wishOwnerName: name,
                wishId: itemData.item.id,
              },
            });
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonShadow}>
            <Text onPress={deleteHandler.bind(this, itemData.item.id)} style={styles.button}>Opdater Ønske</Text>
          </View>
          <View style={styles.buttonShadow}>
            <Text onPress={deleteHandler.bind(this, itemData.item.id)} style={styles.button}>Slet Ønske</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        renderItem={renderWishItem}
        keyExtractor={(item) => { return item.id; }}
      />
    </View>
  );
};

export default WishList;

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
  list: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
