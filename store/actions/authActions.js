/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../../config/firebaseConfig';

export const AUTHENTICATE = 'AUTHENTICATE';
export const REFRESH = 'REFRESH';
export const LOGOUT = 'LOGOUT';

// let timer;

export const authenticate = (userId) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId });
  };
};

// export const login = (email, password) => {
export const login = () => {
  console.log('login');
  return async (dispatch) => {
    const user = async () => {
      try {
        return await firebase.auth().signInWithEmailAndPassword('joghur@gmail.com', 'testing');
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line eqeqeq
        if (errorCode == 'auth/weak-password') {
          console.log('Weak Password!');
        } else {
          console.log(errorMessage);
        }
      }
    };

    // const token = getState().auth.token;
    const user_obj = await user();
    console.log('user_obj.user.uid', user_obj.user.uid);

    dispatch(authenticate(user_obj.user.uid));
    // saveDataToStorage(resData.idToken, resData.localId);
    // saveRefreshToStorage(resData.refreshToken);
  };
};

// export const loginWEB = (email, password) => {
// 	console.log('login');
// 	return async (dispatch) => {
// 		const response = await fetch(
// 			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify({
// 					email,
// 					password,
// 					returnSecureToken: true
// 				})
// 			}
// 		);

// 		if (!response.ok) {
// 			const errorResData = await response.json();
// 			const errorId = errorResData.error.message;
// 			let message = 'Something went wrong! AuthActions r38';
// 			if (errorId === 'EMAIL_NOT_FOUND') {
// 				message = 'This email could not be found!';
// 			} else if (errorId === 'INVALID_PASSWORD') {
// 				message = 'This password is not valid!';
// 			}
// 			throw new Error(message);
// 		}

// 		const resData = await response.json();
// 		dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
// 		const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
// 		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
// 		saveRefreshToStorage(resData.refreshToken);
// 	};
// };

export const refresh = (refreshToken) => {
  console.log('authActions, refresh');

  // if (!refreshToken) {
  //   props.navigation.navigate('Auth');
  //   return;
  // }

  const tok = refreshToken;

  const headerBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: tok,
    }),
  };

  console.log('headerBody', headerBody);

  return async (dispatch) => {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`, headerBody);

    if (!response.ok) {
      console.log('authActions, !response.ok, response', response.ok);
      const errorResData = await response.json();
      console.log(errorResData.error.message);
      const errorId = errorResData.error.message;
      let message = 'Something went wrong! AuthActions r88';
      if (errorId === 'USER_DISABLED' || errorId === 'USER_NOT_FOUND') {
        message = 'Bruger kunne ikke bruges/findes!';
      } else if (errorId === 'INVALID_REFRESH_TOKEN') {
        message = 'Bruger kunne ikke logges ind! ';
      } else if (errorId === 'MISSING_GRANT_TYPE') {
        message = 'Bruger kunne ikke logges ind! GrantType';
      }
      throw new Error(message);
    }

    // TOKEN_EXPIRED: The user's credential is no longer valid. The user must sign in again.
    // USER_DISABLED: The user account has been disabled by an administrator.
    //   USER_NOT_FOUND: The user corresponding to the refresh token was not found.It is likely the user was deleted.
    // API key not valid.Please pass a valid API key. (invalid API key provided)
    // INVALID_REFRESH_TOKEN: An invalid refresh token is provided.
    // Invalid JSON payload received.Unknown name \"refresh_tokens\": Cannot bind query parameter. Field 'refresh_tokens' could not be found in request message.
    // INVALID_GRANT_TYPE: the grant type specified is invalid.
    //   MISSING_REFRESH_TOKEN: no refresh token provided.

    const resData = await response.json();
    // console.log("refresh", resData);
    dispatch(authenticate(resData.localId, resData.idToken));
    saveDataToStorage(resData.idToken, resData.localId);
    saveRefreshToStorage(resData.refreshToken);
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  AsyncStorage.removeItem('refreshToken');
  return { type: LOGOUT };
};

export const lightLogout = () => {
  console.log('lightLogout');
  // clearLogoutTimer();
  refresh();
  return { type: REFRESH };
};

const saveDataToStorage = (token, userId) => {
  console.log('saveDataToStorage');
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
    }),
  );
};

const saveRefreshToStorage = (refreshToken) => {
  console.log('saveRefreshToStorage');
  AsyncStorage.setItem(
    'refreshToken',
    JSON.stringify({
      refreshToken,
    }),
  );
};
