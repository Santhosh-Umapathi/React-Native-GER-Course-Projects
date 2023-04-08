import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
//Navigator
import MealsNavigator from "./src/navigation/MealsNavigator";

import { useScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
//Reducer
import mealsReducer from "./src/store/reducers";
import { Provider } from "react-redux";

// useScreens();
//Loading Customer fonts
const fetchFonts = (params) => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const rootReducer = combineReducers({
    meals: mealsReducer,
  });
  const store = createStore(rootReducer);

  //Splash Screen when fonts are loading
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
