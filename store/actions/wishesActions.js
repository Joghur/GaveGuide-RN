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
        console.log(doc.id, '=>', doc.data());
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
      console.log(err);
      // throw err;
    }
  };
};

export const createWish = (title, text, price, url, imageUri) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    const wishesDB = firebase.firestore().collection('wishes');

    const wish_ref = await wishesDB.add({
      groupId: '1',
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
        groupId: '1',
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

// export const updateWish = (id, title, text, price, url, imageUri) => {
//   return async (dispatch, getState) => {
//     // redux-thunk giver muilighed for at at aflæse state inde i
//     // dispatch function

//     const wishesDB = firebase.firestore().collection('wishes');

//     // PATCH opdaterer kun de punkter vi leverer
//     // PUT opdaterer hele molevitten
//     const response = await fetch(`${DB}/wishes/${id}.json?auth=${token}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title,
//         text,
//         price,
//         url,
//         imageUri,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Something went wrong. wishActions updateWish');
//     }

//     dispatch({
//       type: UPDATE_WISH,
//       wishId: id,
//       wishData: {
//         title,
//         text,
//         price,
//         url,
//         imageUri,
//       },
//     });
//   };
// };

export const deleteWish = (wishId) => {
  return async (dispatch, getState) => {
    const wishesDB = firebase.firestore().collection('wishes');

    const res = await wishesDB.doc(wishId).delete();
    console.log('res -----------------', res);
    // if (!response.ok) {
    //   throw new Error('Something went wrong. wishActions deleteWish');
    // }

    dispatch({
      type: DELETE_WISH,
      wishId,
    });
  };
};
