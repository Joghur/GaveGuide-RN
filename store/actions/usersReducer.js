import User from "../../models/user"
import { DB } from '../../settings.json';

export const SET_USER = 'SET_USER';

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        const userId = getState().authActions.userId;

        try {

            const response = await fetch(
                DB + '/users.json'
            );

            if (!response.ok) {
                throw new Error("Something went wrong! usersReducer");
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
