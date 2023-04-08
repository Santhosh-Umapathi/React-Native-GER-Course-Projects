import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "./MealItem";

const MealList = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.meals);

  const renderItem = ({ item }) => {
    const isFavorite = state.favoriteMeals.some((f) => f.id === item.id);

    return (
      <MealItem
        item={item}
        onPress={() => {
          navigation.navigate("MealDetail", {
            mealId: item.id,
            mealTitle: item.title,
            isFavorite,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.containerView}>
      <FlatList
        data={props.data}
        keyExtractor={(key) => key.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MealList;
