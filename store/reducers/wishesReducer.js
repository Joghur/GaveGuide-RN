/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import {
  DELETE_WISH,
  CREATE_WISH,
  UPDATE_WISH,
  SET_WISH,
} from '../actions/wishesActions';
import Wish from '../../models/wish';

const initialState = {
  availableWishes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WISH:
      return {
        availableWishes: action.wishes,
      };

    case CREATE_WISH:
      const newWish = new Wish(
        action.wishData.id,
        action.wishData.groupId,
        action.wishData.ownerId,
        action.wishData.title,
        action.wishData.text,
        action.wishData.price,
        action.wishData.url,
        action.wishData.imageUri,
      );
      return {
        availableWishes: state.availableWishes.concat(newWish),
      };

    case UPDATE_WISH:
      const wishIndex = state.availableWishes.findIndex(
        (wish) => { return wish.id === action.wishId; },
      );
      const updatedWish = new Wish(
        action.wishId,
        action.wishData.groupId,
        state.availableWishes[wishIndex].ownerId,
        action.wishData.title,
        action.wishData.text,
        action.wishData.price,
        action.wishData.url,
        action.wishData.imageUri,
      );

      const availableWishIndex = state.availableWishes.findIndex(
        (wish) => { return wish.id === action.wishId; },
      );

      const updatedAvailableWishes = [...state.availableWishes];
      updatedAvailableWishes[availableWishIndex] = updatedWish;

      return {
        availableWishes: updatedAvailableWishes,
      };

    case DELETE_WISH:
      return {
        availableWishes: state.availableWishes.filter(
          (wish) => { return wish.id !== action.wishId; },
        ),
      };
  }

  return state;
};
