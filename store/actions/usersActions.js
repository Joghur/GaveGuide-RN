/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import firebase from 'firebase';
import User from '../../models/user';
import 'firebase/firestore';

export const SET_USER = 'SET_USER';

/**
 * fetchUsers
 * Fetches all users in users collection from firebase
 */
export const fetchUsers = () => {
  console.log('fetchUsers');

  return async (dispatch) => {
    const usersDB = firebase.firestore().collection('users');
    try {
      const loadedUsers = [];

      const snapshot = await usersDB.get();
      snapshot.forEach((doc) => {
        loadedUsers.push(
          new User(
            doc.data().id,
            doc.data().name,
            doc.data().groupIds,
            doc.data().imageUri,
            doc.data().color,
          ),
        );
      });
      dispatch({
        type: SET_USER,
        users: loadedUsers,
      });
    } catch (err) {
      console.log('fetchUsers, error', err);
    }
  };
};
