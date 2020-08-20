import Wish from '../../models/wish';
import { DB } from '../../wishConfig.json';

export const DELETE_WISH = 'DELETE_WISH';
export const CREATE_WISH = 'CREATE_WISH';
export const UPDATE_WISH = 'UPDATE_WISH';
export const SET_WISH = 'SET_WISH';

export const fetchWishes = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    try {
      const response = await fetch(
        `${DB}/wishes.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong, WishesActions');
      }

      const resData = await response.json();

      // konverterer object (der er fyldt med data om hvert ønske)
      // om til array
      const loadedWishes = [];
      for (const key in resData) {
        loadedWishes.push(new Wish(
          key,
          resData[key].groupId,
          resData[key].ownerId,
          resData[key].title,
          resData[key].description,
          resData[key].text,
          resData[key].price,
          resData[key].url,
          resData[key].imageUri,
        ));
      }

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

    // any async code (because of redux-thunk)
    // .json firebase specific thing
    const response = await fetch(
      `${DB}/wishes.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupId: "1",
        ownerId: userId,
        title,
        text,
        price,
        url,
        imageUri,
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_WISH,
      wishData: {
        id: resData.name,
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
      pid: id,
      productData: {
        title,
        description,
        imageUrl
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
      pid: wishId
    });
  };
};
