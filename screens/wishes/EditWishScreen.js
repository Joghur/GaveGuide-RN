import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as wishesActions from '../../store/actions/wishesActions';
import Input from '../../components/UI/Input';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditWishScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()


  const wishId = props.navigation.getParam('wishId');
  const editedWish = useSelector(state =>
    state.wishes.availableWishes.find(wish => wish.id === wishId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedWish ? editedWish.title : '',
      text: editedWish ? editedWish.text : '',
      price: ''
    },
    inputValidities: {
      title: editedWish ? true : false,
      text: editedWish ? true : false,
      price: editedWish ? true : false
    },
    formIsValid: editedWish ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: 'Ok' }])
    }
    // return () => {
    //   cleanup
    // }
  }, [error])


  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }

    setError(null);
    setIsLoading(true)

    try {
      // if (editedWish) {
      //   await dispatch(
      //     wishesActions.updateProduct(
      //       prodId,
      //       formState.inputValues.title,
      //       formState.inputValues.description,
      //       formState.inputValues.imageUrl
      //     )
      //   );
      // } else {
      await dispatch(
        wishesActions.createWish(
          formState.inputValues.title,
          formState.inputValues.text,
          +formState.inputValues.price,
          formState.inputValues.url,
          formState.inputValues.imageUri
        )
      );
      // }
      props.navigation.goBack();
    } catch (error) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, wishId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
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
            id="imageUri"
            label="Image Uri"
            errorText="Please enter a valid image uri!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedWish ? editedWish.imageUrl : ''}
            initiallyValid={!!editedWish}
          />
          <Input
            id="url"
            label="url"
            errorText="Please enter a valid url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedWish ? editedWish.url : ''}
            initiallyValid={!!editedWish}
          />
          <Input
            id="price"
            label="Pris"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            min={0.1}
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
            initialValue={editedWish ? editedWish.description : ''}
            initiallyValid={!!editedWish}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditWishScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('wishId')
      ? 'Ændre Ønske'
      : 'Nyt Ønske',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditWishScreen;