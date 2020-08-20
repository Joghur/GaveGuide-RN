import Wish from "../../models/wish"
import { DB } from '../../settings.json';

export const SET_WISH = 'SET_WISH';

export const fetchWishes = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {

      const response = await fetch(
        DB + '/wishes.json'
      );

      if (!response.ok) {
        throw new Error("Something went wrong, WishesActions");
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
        ))
      }

      dispatch({
        type: SET_WISH,
        wishes: loadedWishes
      })
    } catch (err) {
      throw err;
    }
  }
}
