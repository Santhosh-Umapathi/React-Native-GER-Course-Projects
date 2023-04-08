import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
//Constants
import Colors from "./src/constants/Colors";

const SplashScreen = () => {
  return (
    <View style={styles.containerView}>
      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif",
        }}
        style={{
          width: "60%",
          height: "30%",
          marginLeft: -40,
          marginBottom: 10,
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
