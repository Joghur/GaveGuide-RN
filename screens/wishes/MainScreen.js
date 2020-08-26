/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, FlatList,
} from 'react-native';
import firebase from 'firebase';

import { HeaderButtons, Item, } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import UserGridTile from '../../components/UI/UserGridTile';

const MainScreen = (props) => {
  console.log('MainScreen');
  const users = useSelector((state) => { return state.users.availableUsers; });

  const user_obj = firebase.auth().currentUser;
  console.log('MainScreen - user_obj.uid', user_obj.uid);
  const currentUserObject = users.find((user) => { return user.id === user_obj.uid; });
  let restUsers = users.filter((user) => { return user.id !== user_obj.uid; });

  restUsers = restUsers.sort((a, b) => {
    const fa = a.name.toLowerCase();
    const fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  /**
   * Sorting array so that logged in user is at the top
   */
  let newUserArray = [];
  newUserArray.push(currentUserObject);
  newUserArray = newUserArray.concat(restUsers);

  const renderGridItem = (itemData) => {
    return (
      <UserGridTile
        name={itemData.item.name}
        image={itemData.item.imageUri}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'PeopleWishes',
            params: {
              userId: itemData.item.id,
              name: itemData.item.name,
            },
          });
        }}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={newUserArray}
        keyExtractor={(item) => { return item.id; }}
        numColumns={2}
        renderItem={renderGridItem}
      />
    </View>
  );
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Vælg person',
    headerLeft: (() => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    }),
  };
};

export default MainScreen;
