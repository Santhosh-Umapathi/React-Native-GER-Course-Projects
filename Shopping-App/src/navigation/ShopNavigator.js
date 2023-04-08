import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

//Constants
import Colors from "../constants/Colors";
//Screens
import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductScreen, {
  screenOptions as userProductScreenOptions,
} from "../screens/user/UserProductScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
//Redux
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: { fontFamily: "open-sans" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const AuthStackNavigator = createStackNavigator();
const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <AuthStackNavigator.Screen
      name="Auth"
      component={AuthScreen}
      options={authScreenOptions}
    />
  </AuthStackNavigator.Navigator>
);

const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <ProductsStackNavigator.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={productsOverviewScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="ProductsDetails"
      component={ProductDetailScreen}
      options={productDetailScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="Cart"
      component={CartScreen}
      options={cartScreenOptions}
    />
  </ProductsStackNavigator.Navigator>
);

const OrdersNavigator = () => (
  <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <OrdersStackNavigator.Screen
      name="Orders"
      component={OrdersScreen}
      options={ordersScreenOptions}
    />
  </OrdersStackNavigator.Navigator>
);

const AdminNavigator = () => (
  <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <AdminStackNavigator.Screen
      name="UserProducts"
      component={UserProductScreen}
      options={userProductScreenOptions}
    />
    <AdminStackNavigator.Screen
      name="EditProducts"
      component={EditProductScreen}
      options={editProductScreenOptions}
    />
  </AdminStackNavigator.Navigator>
);

export const ShopDrawerNavigator = () => {
  const dispatch = useDispatch();

  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        activeTintColor: Colors.primaryColor,
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <SafeAreaView>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primaryColor}
                onPress={() => dispatch(authActions.logout())}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <DrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={25}
              color={props.color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={25}
              color={props.color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={25}
              color={props.color}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};
