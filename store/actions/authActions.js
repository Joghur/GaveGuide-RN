/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import firebase from "firebase";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (user_obj) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, user_obj });
  };
};

export const login = (email, password) => {
  let em = email;
  let pw = password;
  if (!em) {
    em = "<email>";
  }
  if (!pw) {
    pw = "testing";
  }

  return async () => {
    await signin(em, pw);
    const user_obj = firebase.auth().currentUser;
    console.log("user_obj", user_obj);
  };
};

export const logout = () => {
  return async () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Logged out!");
        },
        (error) => {
          console.log(error.code);
          console.log(error.message);
        }
      );
  };
};

const signin = (email, password) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      console.log("authActions - signin error: ", error.code, error.message);
    });
};
