/* eslint-disable global-require */
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { YellowBox } from 'react-native';

import * as firebase from 'firebase';
import wishesReducer from './store/reducers/wishesReducer';
import authReducer from './store/reducers/authReducer';
import usersReducer from './store/reducers/usersReducer';
import NavigationContainer from './navigation/NavigationContainer';

import firebaseConfig from './config/firebaseConfig';

const rootReducer = combineReducers({
  wishes: wishesReducer,
  users: usersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'chilanka-regular': require('./assets/fonts/Chilanka-Regular.ttf'),
    comingSoon: require('./assets/fonts/ComingSoon.ttf'),
    cutivemono: require('./assets/fonts/CutiveMono.ttf'),
    'dancingScript-bold': require('./assets/fonts/DancingScript-Bold.ttf'),
    'dancingScript-regular': require('./assets/fonts/DancingScript-Regular.ttf'),
    purisa: require('./assets/fonts/Purisa.ttf'),
    'purisa-bold': require('./assets/fonts/Purisa-Bold.ttf'),
    'purisa-bold-oblique': require('./assets/fonts/Purisa-BoldOblique.ttf'),
    'purisa-oblique': require('./assets/fonts/Purisa-Oblique.ttf'),
    sawasdee: require('./assets/fonts/Sawasdee.ttf'),
    'sawasdee-bold': require('./assets/fonts/Sawasdee-Bold.ttf'),
    'sawasdee-bold-oblique': require('./assets/fonts/Sawasdee-BoldOblique.ttf'),
    'sawasdee-oblique': require('./assets/fonts/Sawasdee-Oblique.ttf'),
  });
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  // ignoring for now the yellow warning about too long setTimeout (auto logout)
  YellowBox.ignoreWarnings(['Setting a timer']);

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
