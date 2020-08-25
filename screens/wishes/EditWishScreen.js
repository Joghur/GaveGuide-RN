/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, {
  useEffect, useCallback, useReducer, useState,
} from 'react';
import {
  View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import HeaderButton from '../../components/UI/HeaderButton';
import * as wishesActions from '../../store/actions/wishesActions';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditWishScreen = (props) => {
  console.log('EditWishesScreen');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const wishId = props.navigation.getParam('wishId');
  const editedWish = useSelector((state) => {
    return state.wishes.availableWishes.find((wish) => {
      return wish.id === wishId;
    });
  });
  console.log('EditWishesScreen, wishId, editedWish', wishId, !!editedWish);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedWish ? editedWish.title : '',
      text: editedWish ? editedWish.text : '',
      price: editedWish ? editedWish.price : '',
      url: editedWish ? editedWish.url : '',
      imageUri: editedWish ? editedWish.imageUri : '',
    },
    inputValidities: {
      title: !!editedWish,
    },
    formIsValid: !!editedWish,
  });

  useEffect(
    () => {
      if (error) {
        Alert.alert('An error occured', error, [{ text: 'Ok' }]);
      }
    },
    [error],
  );

  const submitHandler = useCallback(
    async () => {
      console.log('EditWishesScreen - submitHandler - editedWish', !!editedWish);
      if (!formState.formIsValid) {
        Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
        return;
      }

      setError(null);
      setIsLoading(true);

      try {
        console.log('EditWishesScreen - try, formState.inputValues', formState.inputValues);
        if (editedWish) {
          await dispatch(
            wishesActions.updateWish(
              wishId,
              '1',
              formState.inputValues.title,
              formState.inputValues.text,
              formState.inputValues.price,
              formState.inputValues.url,
              formState.inputValues.imageUri,
            ),
          );
        } else {
          await dispatch(
            wishesActions.createWish(
              '1',
              formState.inputValues.title,
              formState.inputValues.text,
              formState.inputValues.price,
              formState.inputValues.url,
              formState.inputValues.imageUri,
            ),
          );
        }
        props.navigation.goBack();
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    },
    [dispatch, wishId, formState],
  );

  useEffect(
    () => {
      props.navigation.setParams({ submit: submitHandler });
    },
    [submitHandler],
  );

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Titel"
            errorText="Indtast en titel!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedWish ? editedWish.title : ''}
            initiallyValid={!!editedWish}
            required
          />
          <Input
            id="price"
            label="Pris"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            initialValue={editedWish ? editedWish.price : "0"}
            onInputChange={inputChangeHandler}
            initiallyValid={!!editedWish}
          />
          <Input
            id="text"
            label="Gave ønske"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedWish ? editedWish.text : ''}
            initiallyValid={!!editedWish}
          />
          <Input
            id="url"
            label="Link til gaveønske"
            errorText="Indtast et passende link til et gaveønske!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedWish ? editedWish.url : ''}
            initiallyValid={!!editedWish}
          />
          <Input
            id="imageUri"
            label="Link til billede"
            errorText="Indtast et passende link til et billede!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedWish ? editedWish.imageUri : ''}
            initiallyValid={!!editedWish}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditWishScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('wishId') ? 'Ændre Ønske' : 'Nyt Ønske',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditWishScreen;
