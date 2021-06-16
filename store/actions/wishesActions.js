/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import firebase from "firebase";
import Wish from "../../models/wish";
import "firebase/firestore";

export const DELETE_WISH = "DELETE_WISH";
export const CREATE_WISH = "CREATE_WISH";
export const UPDATE_WISH = "UPDATE_WISH";
export const SET_WISH = "SET_WISH";

export const fetchWishes = () => {
  return async (dispatch, getState) => {
    const wishesDB = firebase.firestore().collection("wishes");
    try {
      const loadedWishes = [];

      const snapshot = await wishesDB.get();
      snapshot.forEach((doc) => {
        loadedWishes.push(
          new Wish(
            doc.id,
            doc.data().groupId,
            doc.data().ownerId,
            doc.data().title,
            doc.data().text,
            doc.data().price,
            doc.data().url,
            doc.data().imageUri
          )
        );
      });

      dispatch({
        type: SET_WISH,
        wishes: loadedWishes,
      });
    } catch (err) {
      console.log("fetchWishes - error", err);
    }
  };
};

export const createWish = (groupId, title, text, price, url, imageUri) => {
  return async (dispatch, getState) => {
    const user_obj = firebase.auth().currentUser;
    const wishesDB = firebase.firestore().collection("wishes");
    const wish_ref = await wishesDB.add({
      groupId,
      ownerId: user_obj.uid,
      title,
      text,
      price,
      url,
      imageUri,
    });

    dispatch({
      type: CREATE_WISH,
      wishData: {
        id: wish_ref.id,
        groupId,
        ownerId: user_obj.uid,
        title,
        text,
        price,
        url,
        imageUri,
      },
    });
  };
};

export const updateWish = (id, groupId, title, text, price, url, imageUri) => {
  return async (dispatch, getState) => {
    // redux-thunk giver mulighed for at at aflæse state inde i
    // dispatch function

    const user_obj = firebase.auth().currentUser;
    const wishesDB = firebase.firestore().collection("wishes");

    wishesDB.doc(id).update({
      groupId,
      ownerId: user_obj.uid,
      title,
      text,
      price,
      url,
      imageUri,
    });

    dispatch({
      type: UPDATE_WISH,
      wishId: id,
      wishData: {
        groupId,
        ownerId: user_obj.uid,
        title,
        text,
        price,
        url,
        imageUri,
      },
    });
  };
};

export const deleteWish = (wishId) => {
  return async (dispatch) => {
    const wishesDB = firebase.firestore().collection("wishes");

    await wishesDB.doc(wishId).delete();

    dispatch({
      type: DELETE_WISH,
      wishId,
    });
  };
};
