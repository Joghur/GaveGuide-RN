import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  DrawerItems,
} from 'react-navigation';
import {
  Platform, SafeAreaView, Button, View, Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import MainScreen from '../screens/wishes/MainScreen';
import PeopleWishesScreen from '../screens/wishes/PeopleWishesScreen';
import StartupScreen from '../screens/StartupScreen';
import WishDetailScreen from '../screens/wishes/WishDetailScreen';
import AllWishesScreen from '../screens/wishes/AllWishesScreen';
import EditWishScreen from '../screens/wishes/EditWishScreen';
import AuthScreen from '../screens/user/AuthScreen';
import UserScreen from '../screens/user/UserScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';
import { version } from '../version.json';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'chilanka-regular',
  },
  headerBackTitleStyle: {
    fontFamily: 'comingSoon',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accent,
};

const WishListNavigator = createStackNavigator(
  {
    MainScreen,
    PeopleWishes: PeopleWishesScreen,
    WishDetail: WishDetailScreen,
    EditWish: EditWishScreen,
    AllWishes: AllWishesScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons
            name="md-create"
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const UserNavigator = createStackNavigator(
  {
    UserProducts: UserScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons
            name="ios-create"
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const TabNavigator = createBottomTabNavigator({
  Wishes: {
    screen: WishListNavigator,
    navigationOptions: {
      tabBarLabel: 'Ønsker',
    },
  },
  AllWishes: {
    screen: AllWishesScreen,
    navigationOptions: {
      tabBarLabel: 'Alle',
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'purisa-bold-oblique',
      fontSize: 20,
    },
    activeTintColor: Colors.primary,
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    TabBar: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLabel: 'Ønsker',
      },
    },
    User: UserNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accent,
      labelStyle: {
        fontFamily: 'dancingScript-bold',
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Text style={{ padding: 10 }}>{version}</Text>
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Drawer: DrawerNavigator,
});

export default createAppContainer(MainNavigator);
