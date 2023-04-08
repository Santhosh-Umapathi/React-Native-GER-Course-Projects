import AsyncStorage from "@react-native-async-storage/async-storage";
//Constants
import Firebase from "../../constants/Firebase";
//Types
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const DID_TRY_AUTO_LOGIN = "DID_TRY_AUTO_LOGIN";

let isTimerInitialized;

export const didTryAutoLogin = () => {
  return { type: DID_TRY_AUTO_LOGIN };
};

export const authenticate = (userId, token, expTime) => {
  return (dispatch) => {
    dispatch(timer(expTime));
    dispatch({ type: AUTHENTICATE, payload: { userId, token } });
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  clearTimer();
  return { type: LOGOUT };
};

const timer = (expTime) => {
  return (dispatch) => {
    isTimerInitialized = setTimeout(() => {
      dispatch(logout());
    }, expTime); // / 1000 =>fake auto logout timer
  };
};

const clearTimer = () => {
  isTimerInitialized && clearTimeout(isTimerInitialized);
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        Firebase.SIGNUP_ENDPOINT + Firebase.API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();

      let errorMessage = "Something went wrong";

      if (!response.ok) {
        const errorId = resData.error.message;

        if (errorId === "EMAIL_NOT_FOUND") {
          errorMessage = "This email is not found";
        } else if (errorId === "INVALID_PASSWORD") {
          errorMessage = "Incorrect Password";
        } else if (errorId === "INVALID_EMAIL") {
          errorMessage = "Email is not valid";
        } else if (errorId === "MISSING_PASSWORD") {
          errorMessage = "Password is not valid";
        } else if (errorId === "EMAIL_EXISTS") {
          errorMessage = "This email already used";
        } else if (errorId === "OPERATION_NOT_ALLOWED") {
          errorMessage = "Not allowed";
        } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          errorMessage = "Too many attempts, try again later";
        } else if (errorId === "USER_DISABLED") {
          errorMessage = "Account blocked temporarily";
        }

        throw new Error(errorMessage);
      }

      //or
      // dispatch({
      //   type: SIGNUP,
      //   payload: { token: resData.idToken, userId: resData.localId },
      // });

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        Firebase.SIGNIN_ENDPOINT + Firebase.API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();

      let errorMessage = "Something went wrong";

      if (!response.ok) {
        const errorId = resData.error.message;

        if (errorId === "EMAIL_NOT_FOUND") {
          errorMessage = "This email is not found";
        } else if (errorId === "INVALID_PASSWORD") {
          errorMessage = "Incorrect Password";
        } else if (errorId === "INVALID_EMAIL") {
          errorMessage = "Email is not valid";
        } else if (errorId === "MISSING_PASSWORD") {
          errorMessage = "Password is not valid";
        } else if (errorId === "EMAIL_EXISTS") {
          errorMessage = "This email already used";
        } else if (errorId === "OPERATION_NOT_ALLOWED") {
          errorMessage = "Not allowed";
        } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          errorMessage = "Too many attempts, try again later";
        } else if (errorId === "USER_DISABLED") {
          errorMessage = "Account blocked temporarily";
        }

        throw new Error(errorMessage);
      }

      // dispatch({
      //   type: LOGIN,
      //   payload: { token: resData.idToken, userId: resData.localId },
      // });
      //or
      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ userId, token, expiryDate: expirationDate.toISOString() })
  );
};
