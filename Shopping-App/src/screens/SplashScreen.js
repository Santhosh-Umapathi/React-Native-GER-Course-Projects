import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const SplashScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const tryLogin = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));

    //No user data saved before
    if (!userData) {
      dispatch(authActions.didTryAutoLogin());
      return;
    }

    //Token expiry check
    const { token, userId, expiryDate } = userData;

    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date() || !token || !userId) {
      dispatch(authActions.didTryAutoLogin());
      return;
    }

    //Remaining time for auto logout
    const expTime = expirationDate.getTime() - new Date().getTime();
    dispatch(authActions.authenticate(userId, token, expTime));
  };

  useEffect(() => {
    setTimeout(() => {
      tryLogin();
    }, 2000);
  }, []);

  return (
    <View style={styles.containerView}>
      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif",
        }}
        style={{
          width: "60%",
          height: "40%",
          marginLeft: -40,
          marginVertical: 10,
        }}
        resizeMode="cover"
      />
      <Text style={styles.text}>Shopping</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.splash,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.accentColor,
  },
});

export default SplashScreen;
