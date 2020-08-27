/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import firebase from 'firebase';
import Wish from '../../models/wish';
import 'firebase/firestore';

export const DELETE_WISH = 'DELETE_WISH';
export const CREATE_WISH = 'CREATE_WISH';
export const UPDATE_WISH = 'UPDATE_WISH';
export const SET_WISH = 'SET_WISH';

export const fetchWishes = () => {
  console.log('fetchWishes');

  return async (dispatch, getState) => {
    const wishesDB = firebase.firestore().collection('wishes');
    try {
      const loadedWishes = [];

      const snapshot = await wishesDB.get();
      snapshot.forEach((doc) => {
        // console.log('fetchWishes - ', doc.id, '=>', doc.data());
        loadedWishes.push(
          new Wish(
            doc.id,
            doc.data().groupId,
            doc.data().ownerId,
            doc.data().title,
            doc.data().text,
            doc.data().price,
            doc.data().url,
            doc.data().imageUri,
          ),
        );
      });

      dispatch({
        type: SET_WISH,
        wishes: loadedWishes,
      });
    } catch (err) {
      console.log('fetchWishes - error', err);
      // throw err;
    }
  };
};

export const createWish = (title, text, price, url, imageUri) => {
  console.log('createWish');

  return async (dispatch, getState) => {
    console.log('createWish, dispatch');
    const user_obj = firebase.auth().currentUser;
    console.log('createWish - user_obj', user_obj);
    console.log('createWish - user_obj.uid', user_obj.uid);
    const wishesDB = firebase.firestore().collection('wishes');

    const wish_ref = await wishesDB.add({
      groupId: '1',
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
        groupId: '1',
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
  console.log('updateWish');

  return async (dispatch, getState) => {
    // redux-thunk giver mulighed for at at aflæse state inde i
    // dispatch function

    console.log('updateWishAction - dispatch');

    const { userId } = getState().auth;
    const wishesDB = firebase.firestore().collection('wishes');

    wishesDB.doc(id).update({
      groupId,
      ownerId: userId,
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
        ownerId: userId,
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
  console.log('deleteWishAction');
  return async (dispatch) => {
    console.log('deleteWishAction - dispatch');
    const wishesDB = firebase.firestore().collection('wishes');

    await wishesDB.doc(wishId).delete();

    dispatch({
      type: DELETE_WISH,
      wishId,
    });
  };
};
