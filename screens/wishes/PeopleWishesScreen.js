import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import DefaultText from '../../components/UI/DefaultText';
import HeaderButton from '../../components/UI/HeaderButton';
import WishList from '../../components/UI/WishList'
import * as wishesActions from '../../store/actions/wishesActions';
import Colors from '../../constants/Colors';

const PeopleWishesScreen = props => {
  console.log("PeopleWishesScreen")
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const userId = props.navigation.getParam('userId')
  const wishes = useSelector(state => state.wishes.availableWishes);
  const selectedWishes = wishes.filter(wish => wish.ownerId === userId);
  console.log("PeopleWishesScreen, useEffect, userId", userId)
  console.log("PeopleWishesScreen, useEffect, wishes", wishes)
  console.log("PeopleWishesScreen, useEffect, selectedWishes", selectedWishes)
  const dispatch = useDispatch();

  const loadWishes = useCallback(async () => {
    console.log("PeopleWishesScreen, useEffect")
    setError(null);
    setIsRefreshing(true)
    try {
      await dispatch(wishesActions.fetchWishes());
    } catch (err) {
      console.log("error, err -------", err)
      setError(err.message);
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  // sidedrawer ligger i hukommelsen og bliver ikke gendannet når man
  // skifter mellem siden (modsat en stackNavigator)
  // Så der skal laves en listener
  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', loadWishes);
    return () => {
      willFocus.remove();
    }
  }, [loadWishes])


  if (error) {
    return (
      <View style={styles.centered} >
        <Text>Der opstod en fejl!</Text>
        <Button
          title="Prøv igen"
          onPress={loadWishes}
          color={Colors.primary}
        />
      </View>
    )
  }

  if (isLoading) {
    return <View style={styles.centered} >
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  if (!isLoading && selectedWishes.length === 0) {
    return <View style={styles.centered} >
      <DefaultText>Ingen ønsker lavet endnu.</DefaultText>
      <Button
        title="Prøv igen"
        onPress={loadWishes}
        color={Colors.primary}
      />
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
