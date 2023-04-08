import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { Platform } from "react-native";
import { Colors } from "../constants";

const HeaderButton = ({ onPress = () => {}, iconName = "" }) => {
  return (
    <Ionicons
      name={iconName}
      size={25}
      color={Platform.OS === "android" ? "#fff" : Colors.primaryColor}
      style={{ paddingHorizontal: 10 }}
      onPress={onPress}
    />
  );
};

export default HeaderButton;
