import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const UserScreen = () => {
  return (
    <View>
      <Text>UserScreen</Text>
    </View>
  )
}

UserScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: (() => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName="ios-menu" onPress={() => {
            navData.navigation.toggleDrawer();
          }} />
        </HeaderButtons>
      )
    })
  }

};
export default UserScreen

const styles = StyleSheet.create({})
