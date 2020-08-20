import { AUTHENTICATE, LOGOUT, REFRESH } from '../actions/authActions';

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };

    case REFRESH:
      return state;

    case LOGOUT:
      return initialState;

    default:
      return state;

  }
};
