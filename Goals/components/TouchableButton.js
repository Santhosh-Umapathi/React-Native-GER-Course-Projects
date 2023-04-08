import React from "react";
import {
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const TouchableButton = (props) => {
  let Component =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return <Component {...props}>{props.children}</Component>;
};

export default TouchableButton;
