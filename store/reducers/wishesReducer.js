import { WISHES } from '../../data/dummy-data';
import {
  SET_WISH
} from '../actions/wishesActions';

const initialState = {
  availableWishes: WISHES
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WISH:
      return {
        availableWishes: action.wishes,
      }
  }
  return state;
};
