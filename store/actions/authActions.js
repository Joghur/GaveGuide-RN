/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../../config/firebaseConfig';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (user_obj) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, user_obj });
  };
};

export const login = (email, password) => {
  console.log('login');
  let em = email;
  let pw = password;
  return async (dispatch) => {
    if (!em) {
      em = 'joghur@gmail.com';
    }
    if (!pw) {
      pw = 'testing';
    }
    const user = async () => {
      try {
        return await firebase.auth().signInWithEmailAndPassword(em, pw);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line eqeqeq
        if (errorCode == 'auth/weak-password') {
          console.log('Weak Password!');
        } else {
          console.log(errorMessage);
        }
      }
    };

    // const token = getState().auth.token;
    const user_obj = await user();
    console.log('user_obj.user.uid', user_obj.user.uid);

    dispatch(authenticate(user_obj));
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  AsyncStorage.removeItem('refreshToken');
  return { type: LOGOUT };
};
