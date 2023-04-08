import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  Platform,
  Switch,
} from "react-native";
import { Colors } from "../constants";

const FilterSwitch = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginVertical: 10,
      }}
    >
      <Text>{props.label}</Text>
      <Switch
        onValueChange={props.setState}
        value={props.state}
        trackColor={{ true: Colors.accentColor, false: "#eee" }}
        thumbColor={Platform.OS === "android" && Colors.accentColor}
      />
    </View>
  );
};

export default FilterSwitch;
