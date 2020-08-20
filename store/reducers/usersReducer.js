import { USERS } from '../../data/dummy-data';
import {
    SET_USER
} from '../actions/usersReducer';

const initialState = {
    availableUsers: USERS
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                availableUsers: action.users,
            }
    }
    return state;
};