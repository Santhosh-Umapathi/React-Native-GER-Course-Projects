import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
//Navigator
import { AuthNavigator, ShopDrawerNavigator } from "./ShopNavigator";
import SplashScreen from "../screens/SplashScreen";

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token); //true or false
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopDrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <SplashScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
