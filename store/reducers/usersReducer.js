/* eslint-disable default-case */
// import { USERS } from '../../data/dummy-data';
import { SET_USER } from "../actions/usersActions";

const initialState = {
  availableUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        availableUsers: action.users,
      };
  }
  return state;
};
