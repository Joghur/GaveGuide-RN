import { WISHES } from '../../data/dummy-data';
import {
  DELETE_WISH,
  CREATE_WISH,
  UPDATE_WISH,
  SET_WISH
} from '../actions/wishesActions';
import Wish from '../../models/wish'

const initialState = {
  availableWishes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WISH:
      return {
        availableWishes: action.wishes,
      }

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
        ...state,
        availableWishes: state.availableWishes.concat(newWish)
      };


  }

  return state;
};
