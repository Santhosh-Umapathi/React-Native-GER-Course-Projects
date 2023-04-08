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
  TouchableNativeFeedback,
} from "react-native";

const CategoryGridItem = ({ item, onPress }) => {
  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.containerView}>
      <TouchableComponent style={styles.grid} onPress={onPress}>
        <View
          style={{
            backgroundColor: item.color,
            flex: 1,
            borderRadius: 5,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: 10,
          }}
        >
          <Text numberOfLines={2} style={styles.text}>
            {item.title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    borderRadius: 5,
    margin: 15,
    height: 150,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  text: {
    fontSize: 20,
    fontFamily: "open-sans",
    textAlign: "right",
  },
  grid: {
    flex: 1,
  },
});

export default CategoryGridItem;
