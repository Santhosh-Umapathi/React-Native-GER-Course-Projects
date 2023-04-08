import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
//Constants
import Firebase from "../../constants/Firebase";
//Model
import Product from "../../model/product";
//Types
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

//Middleware
export const createProduct = (title, description, image, price) => {
  return async (dispatch, getState) => {
    let pushToken = null;
    let permission;
    //Check if already have permission
    permission = await Notifications.getPermissionsAsync();
    // console.log(`[${Platform.OS}] Check Permission:`, permission.status);

    //Request for permission
    if (permission.status !== "granted") {
      permission = await Notifications.requestPermissionsAsync();
      // console.log(`[${Platform.OS}] Request Permission:`, permission.status);
    }

    //Now actions based on permission
    if (permission.status !== "granted") {
      Alert.alert("Permissions required for notifications");
    } else {
      // Only call if permission is granted
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(`[${Platform.OS}] Push Token:`, pushToken);
    }

    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      Firebase.URL_ENDPOINT + `/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          price,
          ownerId: userId,
          ownerPushToken: pushToken,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        image,
        price,
        ownerId: userId,
        ownerPushToken: pushToken,
      },
    });
  };
};

export const setProduct = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        Firebase.URL_ENDPOINT + `/products.json?auth=${token}`
      );

      const resData = await response.json();

      const loadedProducts = [];
      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].image,
            resData[key].description,
            +resData[key].price,
            resData[key].ownerPushToken
          )
        );
      }

      if (!response.ok) {
        // console.log("🚀 --- return --- response", response);
        throw new Error("Something went wrong");
      }

      dispatch({
        type: SET_PRODUCT,
        payload: {
          loadedProducts,
          userProducts: loadedProducts.filter(
            (item) => item.ownerId === userId
          ),
        },
      });
    } catch (error) {
      // console.log("🚀 --- return --- error", error);
      throw error;
    }
  };
};

export const updateProduct = (
  id,
  title,
  description,
  image,
  ownerPushToken
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const updateResponse = await fetch(
        Firebase.URL_ENDPOINT + `/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            image,
            ownerPushToken,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Update failed");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        payload: { id, title, description, image, ownerPushToken },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (producId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const deleteResponse = await fetch(
        Firebase.URL_ENDPOINT + `/products/${producId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: DELETE_PRODUCT,
        payload: producId,
      });
    } catch (error) {
      throw error;
    }
  };
};
