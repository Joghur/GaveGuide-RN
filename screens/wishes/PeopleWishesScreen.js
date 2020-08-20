import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import DefaultText from '../../components/UI/DefaultText';
import HeaderButton from '../../components/UI/HeaderButton';
import WishList from '../../components/UI/WishList'
import Colors from '../../constants/Colors';

const PeopleWishesScreen = props => {
  console.log("PeopleWishesScreen")
  const userId = props.navigation.getParam('userId')
  // console.log("userId", userId)
  const wishes = useSelector(state => state.wishes.availableWishes);
  // console.log("wishes", wishes)
  const selectedWishes = wishes.filter(wish => wish.ownerId === userId);
  // console.log("selectedWishes", selectedWishes)

  if (selectedWishes.length === 0) {
    return <View style={styles.centered} >
      <DefaultText>Ingen ønsker lavet endnu.</DefaultText>
    </View>
  }

  return (
    <View>
      <WishList
        listData={selectedWishes}
        navigation={props.navigation}
      />
    </View>
  );
};

PeopleWishesScreen.navigationOptions = (navigationData) => {
  const name = navigationData.navigation.getParam('name')
  return {
    headerTitle: name,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="EditWish"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigationData.navigation.navigate('EditWish');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default PeopleWishesScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
