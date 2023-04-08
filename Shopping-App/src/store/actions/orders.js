//Constants
import Firebase from "../../constants/Firebase";
import useSendPushNotifications from "../../hooks/useSendPushNotifications";
//Model
import Order from "../../model/orders";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const addToCart = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const date = new Date();
    const response = await fetch(
      Firebase.URL_ENDPOINT + `/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Adding Order failed");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: { id: resData.name, cartItems, totalAmount, date },
    });

    //Send Notifications to owners
    cartItems.forEach(async (element) => {
      await useSendPushNotifications({
        title: `New Order: ${element.productTitle}`,
        body: `${element.productTitle} with quantity ${element.quantity} ordered`,
        pushToken: element.ownerPushToken,
      });
    });
  };
};

export const setOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        Firebase.URL_ENDPOINT + `/orders/${userId}.json?auth=${token}`
      );

      const resData = await response.json();

      const loadedOrders = [];
      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: SET_ORDER,
        payload: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};
