import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import AppLoading from "expo-app-loading";
//Redux
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducers
import productReducers from "./src/store/reducers/products";
import cartReducers from "./src/store/reducers/cart";
import ordersReducers from "./src/store/reducers/orders";
import authReducers from "./src/store/reducers/auth";
//Navigation
import AppNavigator from "./src/navigation/AppNavigator";
//ENV's
import { EXPO_USERNAME } from "@env";
//Foreground - Local Notification trigger
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

//Loading fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  console.log("DOT ENV =>", EXPO_USERNAME);

  const rootReducer = combineReducers({
    products: productReducers,
    cart: cartReducers,
    orders: ordersReducers,
    auth: authReducers,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  useEffect(() => {
    //When notification arrived on foreground
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log("🚀 --- foregroundSubscription --- ", notification);
      });

    //When notification arrived on background and tapped
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("🚀 --- backgroundSubscription", response);
      });

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("error app loading")}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
