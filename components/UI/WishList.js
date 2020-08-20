import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import WishItem from "./WishItem";

const WishList = (props) => {
    console.log("WishList")
    const users = useSelector(state => state.users.availableUsers)

    const renderWishItem = (itemData) => {

        const wishUserId = itemData.item.ownerId;
        const wishUser = users.find(user => user.id === wishUserId);
        let name;
        if (wishUser) {
            name = wishUser.name;
        }

        // console.log("itemData", itemData)
        return (
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
                            wishId: itemData.item.id
                        }
                    })
                }}
            />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                renderItem={renderWishItem}
                keyExtractor={(item, index) => item.id}
            />
        </View>
    )
}

export default WishList

const styles = StyleSheet.create({
    list: {
        alignContent: 'center',
        justifyContent: 'center',
    }
})