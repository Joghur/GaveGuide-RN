import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, FlatList,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import UserGridTile from '../../components/UI/UserGridTile';

const MainScreen = (props) => {
  console.log('MainScreen');
  const users = useSelector((state) => { return state.users.availableUsers; });
  const userId = useSelector((state) => { return state.auth.userId; });
  // console.log("MainScreen, users", users)
  // console.log("MainScreen, userId", userId)

  const loggedInUser = users.find((user) => { return user.id === userId; });
  // console.log("loggedInUser", loggedInUser)
  let restUsers = users.filter((user) => { return user.id !== userId; });
  // console.log("restUsers", restUsers)

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

  let newUserArray = [];
  newUserArray.push(loggedInUser);
  // console.log("1. newUserArray", newUserArray)
  newUserArray = newUserArray.concat(restUsers);
  // console.log("2. newUserArray", newUserArray)

  const renderGridItem = (itemData) => {
    // console.log("MainScreen, renderGridItem, itemData", itemData)
    // console.log("itemData.item.imageUri", itemData.item.imageUri)

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

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
