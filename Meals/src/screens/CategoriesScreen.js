import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import CategoryGridItem from "../components/CategoryGridItem";
import HeaderButton from "../components/HeaderButton";

import { CATEGORIES } from "../data/dummy-data";

const CategoriesScreen = (props) => {
  const { navigation } = props;

  const renderItem = ({ item, index }) => {
    return (
      <CategoryGridItem
        item={item}
        onPress={() => {
          navigation.navigate("CategoryMeal", {
            categoryId: item.id,
          });
        }}
      />
    );
  };

  return <FlatList data={CATEGORIES} numColumns={2} renderItem={renderItem} />;
};

CategoriesScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Meals Category",
    headerLeft: (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    ),
  };
};

export default CategoriesScreen;
