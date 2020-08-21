/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import User from '../../models/user';
import { DB } from '../../wishConfig.json';

export const SET_USER = 'SET_USER';

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().authActions;

    const response = await fetch(
      `${DB}/users.json`,
    );

    if (!response.ok) {
      throw new Error('Something went wrong! usersActions');
    }

    const resData = await response.json();

    console.log("resData", resData)

    // konverterer object (der er fyldt med data om hvert ønske)
    // om til array
    const loadedUsers = [];
    for (const key in resData) {
      loadedUsers.push(new User(
        key,
        resData[key].groupId,
        resData[key].ownerId,
        resData[key].title,
        resData[key].text,
        resData[key].price,
        resData[key].url,
        resData[key].imageUri,
      ));
    }

    dispatch({
      type: SET_USER,
      wishes: loadedUsers,
    });
  };
};
