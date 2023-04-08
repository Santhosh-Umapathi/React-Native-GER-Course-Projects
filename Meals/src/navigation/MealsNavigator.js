import { Platform } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
} from "react-navigation"; //version 3
import { Colors } from "../constants";
//Screens
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FilterScreen from "../screens/FilterScreen";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeal: {
      screen: CategoryMealScreen,
    },
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const FavoritesStackNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const FilterStackNavigator = createStackNavigator(
  {
    Filters: FilterScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const defaultStackNavOptions = {
  // initialRouteName: "MealDetail",
  // mode:'modal',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: { fontFamily: "open-sans-bold" },

    headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor,
  },
};

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites !",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
    },
  },
};

//Tab Navigation
const MealsFavTabNavigator =
  // Platform.OS === "android"
  //? createMaterialBottomTabNavigator(tabScreenConfig, {activeTintColor: Colors.accentColor,shifting: true,}):
  createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  });

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FilterStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
  }
);

export default createAppContainer(MainNavigator);
