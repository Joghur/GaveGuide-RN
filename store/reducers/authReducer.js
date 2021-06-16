import { AUTHENTICATE, LOGOUT } from '../actions/authActions';

const initialState = {
  user_obj: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        user_obj: action.user_obj,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
