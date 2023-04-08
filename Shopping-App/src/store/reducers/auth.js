import {
  AUTHENTICATE,
  DID_TRY_AUTO_LOGIN,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const loginPayload = action.payload;

      return {
        ...state,
        token: loginPayload.token,
        userId: loginPayload.userId,
      };

    case SIGNUP:
      const signUpPayload = action.payload;

      return {
        ...state,
        token: signUpPayload.token,
        userId: signUpPayload.userId,
      };

    case AUTHENTICATE:
      const authPayload = action.payload;

      return {
        ...state,
        token: authPayload.token,
        userId: authPayload.userId,
        didTryAutoLogin: true,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        didTryAutoLogin: true,
      };

    case DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    default:
      return state;
  }
};
