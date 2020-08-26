/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import firebase from 'firebase';

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
  if (!em) {
    em = 'joghur@gmail.com';
  }
  if (!pw) {
    pw = 'testing';
  }

  return async (dispatch) => {
    await signin(em, pw);
    const user_obj = firebase.auth().currentUser;
    console.log('user_obj', user_obj);

    // dispatch(authenticate(user_obj));
  };
};

export const logout = () => {
  return async (dispatch) => {
    firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    }, (error) => {
      console.log(error.code);
      console.log(error.message);
    });
    // dispatch({ type: LOGOUT });
  };
};

const signin = (email, password) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      console.log('authActions - signin error: ', error.code, error.message);
    });
};

// const signin_old = async (email, password) => {
//   try {
//     return await firebase.auth().signInWithEmailAndPassword(em, pw);
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     if (errorCode == 'auth/weak-password') {
//       console.log('Weak Password!');
//     } else {
//       console.log(errorMessage);
//     }
//   }
// };
