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
  ImageBackground,
  TouchableNativeFeedback,
} from "react-native";

const MealItem = ({ item, onPress }) => {
  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.card}>
      <TouchableComponent
        style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}
        onPress={onPress}
      >
        <View style={styles.root}>
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: item.imageUrl }}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.foot}>
                <Text style={styles.footText}>{item.title}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.foot}>
            <Text style={styles.footText}>{item.durations}</Text>
            <Text style={styles.footText}>{item.complexity}</Text>
            <Text style={styles.footText}>{item.affordability}</Text>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "green",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "space-between",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  root: {
    flex: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    borderRadius: 10,
  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "flex-end",
  },
  head: {},
  footText: {
    color: "white",
    fontSize: 15,
    fontFamily: "open-sans",
    textAlign: "center",
    flex: 1,
  },
});

export default MealItem;
