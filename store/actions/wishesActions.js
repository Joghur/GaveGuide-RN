import Wish from '../../models/wish';
import { DB } from '../../wishConfig.json';

import firestore from "../../firebaseConfig";

export const DELETE_WISH = 'DELETE_WISH';
export const CREATE_WISH = 'CREATE_WISH';
export const UPDATE_WISH = 'UPDATE_WISH';
export const SET_WISH = 'SET_WISH';

const wishesDB = firestore.collection('wishes');

export const fetchWishes = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.token;

    try {

      const loadedWishes = [];

      const snapshot = await wishesDB.get();
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        loadedWishes.push(new Wish(
          doc.id,
          doc.data().groupId,
          doc.data().ownerId,
          doc.data().title,
          doc.data().text,
          doc.data().price,
          doc.data().url,
          doc.data().imageUri,
        ));
      });


      // const response = await fetch(
      //   `${DB}/wishes.json?auth=${token}`,
      // );

      // if (!response.ok) {
      //   throw new Error('Something went wrong, WishesActions');
      // }

      // const resData = await response.json();

      // console.log("resData", resData)

      // konverterer object (der er fyldt med data om hvert ønske)
      // om til array
      // for (const key in snapshot) {
      //   loadedWishes.push(new Wish(
      //     key,
      //     snapshot[key].groupId,
      //     snapshot[key].ownerId,
      //     snapshot[key].title,
      //     snapshot[key].text,
      //     snapshot[key].price,
      //     snapshot[key].url,
      //     snapshot[key].imageUri,
      //   ));
      // }

      dispatch({
        type: SET_WISH,
        wishes: loadedWishes,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createWish = (title, text, price, url, imageUri) => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const wish_ref = await wishesDB.add({
      groupId: "1",
      ownerId: userId,
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
        groupId: "1",
        ownerId: userId,
        title,
        text,
        price,
        url,
        imageUri
      }
    })
  };
};

export const updateWish = (id, title, text, price, url, imageUri) => {
  return async (dispatch, getState) => {

    // redux-thunk giver muilighed for at at aflæse state inde i
    // dispatch function

    const token = getState().auth.token;


    // PATCH opdaterer kun de punkter vi leverer
    // PUT opdaterer hele molevitten
    const response = await fetch(
      `${DB}/wishes/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          text,
          price,
          url,
          imageUri
        })
      });

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    dispatch({
      type: UPDATE_WISH,
      wishId: id,
      wishData: {
        title,
        text,
        price,
        url,
        imageUri
      }
    });
  };
};

export const deleteWish = (wishId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `${DB}/wishes/${wishId}.json?auth=${token}`,
      {
        method: 'DELETE'
      });


    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    dispatch({
      type: DELETE_WISH,
      wishId
    });
  };
};
