import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View, Platform, TouchableNativeFeedback, ImageBackground,
} from 'react-native';

const UserGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const image = { uri: props.image };

  return (
    <TouchableCmp onPress={props.onSelect}>
      <View style={{ ...styles.gridItem, ...{ backgroundColor: props.color } }}>
        <View style={styles.container}>
          <View>
            <ImageBackground
              source={image}
              style={styles.bgImage}
            />
          </View>
          <View style={{}}>
            <Text style={styles.name}>{props.name.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: '97%',
    width: '100%',
    marginTop: 5,
    // justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    elevation: 9,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  name: {
    fontFamily: 'chilanka-regular',
    fontSize: 20,
    textAlign: 'right',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});

export default UserGridTile;
