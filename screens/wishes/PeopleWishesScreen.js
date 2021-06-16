import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import DefaultText from "../../components/UI/DefaultText";
import HeaderButton from "../../components/UI/HeaderButton";
import WishList from "../../components/UI/WishList";
import * as wishesActions from "../../store/actions/wishesActions";
import Colors from "../../constants/Colors";
// import { WISHES } from '../../data/dummy-data';

const PeopleWishesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  // react-navigation
  const userId = props.navigation.getParam("userId");

  // redux
  const dispatch = useDispatch();
  const wishes = useSelector((state) => {
    return state.wishes.availableWishes;
  });

  const selectedWishes = wishes.filter((wish) => {
    return wish.ownerId === userId;
  });

  // Uncomment if you need som dummydata. Remember to change files in ./data accordingly

  // const makeDummyWishes = async () => {
  //   console.log('PeopleWishesScreen, makeWishes');
  //   try {
  //     WISHES.map((wish) => {
  //       // console.log('PeopleWishesScreen - wishes map wish', wish);
  //       return dispatch(
  //         wishesActions.createWish(
  //           '1',
  //           wish.title,
  //           wish.text,
  //           wish.price,
  //           wish.url,
  //           wish.imageUri,
  //         ),
  //       );
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const loadWishes = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(wishesActions.fetchWishes());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadWishes();
  }, [loadWishes]);

  // sidedrawer ligger i hukommelsen og bliver ikke gendannet når man
  // skifter mellem siden (modsat en stackNavigator)
  // Så der skal laves en listener
  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", loadWishes);
    return () => {
      willFocus.remove();
    };
  }, [loadWishes]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Der opstod en fejl!</Text>
        <Button title="Prøv igen" onPress={loadWishes} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && !isRefreshing && selectedWishes.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>Ingen ønsker lavet endnu.</DefaultText>
        {/* <Button
          title="makeDummyWishes"
          onPress={makeDummyWishes}
          color={Colors.primary}
        /> */}
      </View>
    );
  }

  return (
    <View>
      {/* <Button
        title="makeDummyWishes"
        onPress={makeDummyWishes}
        color={Colors.primary}
      /> */}
      <WishList listData={selectedWishes} navigation={props.navigation} />
    </View>
  );
};

PeopleWishesScreen.navigationOptions = (navigationData) => {
  const name = navigationData.navigation.getParam("name");
  return {
    headerTitle: name,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="EditWish"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navigationData.navigation.navigate("EditWish");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PeopleWishesScreen;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
