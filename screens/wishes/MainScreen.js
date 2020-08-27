/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, FlatList, Text,
} from 'react-native';
import firebase from 'firebase';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import UserGridTile from '../../components/UI/UserGridTile';
import * as userActions from '../../store/actions/usersActions';

const MainScreen = (props) => {
  console.log('MainScreen');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const users = useSelector((state) => { return state.users.availableUsers; });

  const dispatch = useDispatch();

  const loadUsers = useCallback(
    async () => {
      console.log('MainScreen, loadUsers, useCallback');
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(userActions.fetchUsers());
      } catch (err) {
        console.log('MainScreen - loadUsers - useCallback - error, err -------', err);
        setError(err.message);
      }
      setIsLoading(false);
    },
    [dispatch, setIsLoading, setError],
  );

  useEffect(() => {
    console.log('MainScreen - useEffect, loadUsers');
    loadUsers();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>
          Henter brugere
        </Text>
      </View>
    );
  }
  if (error) {
    console.log('MainScreen - Error: ', error);
  }

  console.log('MainScreen - users', users);
  const user_obj = firebase.auth().currentUser;
  console.log('MainScreen - user_obj.uid', user_obj.uid);
  if (users) {
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
  }
  return (
    <View>
      <Text>
        No users loaded yet
      </Text>
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
