import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const AllWishesScreen = props => {
    return (
        <View><Text>AllWishesScreen</Text></View>
    );
};


export default AllWishesScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})