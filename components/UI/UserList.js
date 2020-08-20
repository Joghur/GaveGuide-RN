import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

import UserItem from "./UserItem";

const UserList = (props) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

    const renderMealItem = (itemData) => {
        const isFavorite = favoriteMeals.find((meal) => {
            return meal.id === itemData.item.id
        }
        )
        return (
            <UserItem title={itemData.item.title}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'PeopleWishes',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
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
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    )
}

export default UserList

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
})
