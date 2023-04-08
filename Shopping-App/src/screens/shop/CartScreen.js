import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
//Card
import Colors from "../../constants/Colors";
//Components
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
//Redux
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = () => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const items = [];
  for (const key in state.items) {
    if (key)
      items.push({
        productId: key,
        productTitle: state.items[key].productTitle,
        productPrice: state.items[key].productPrice,
        quantity: state.items[key].quantity,
        sum: state.items[key].sum,
        ownerPushToken: state.items[key].ownerPushToken,
      });
  }

  const renderItem = ({ item }) => {
    return (
      <CartItem
        item={item}
        deletable
        onPress={() => {
          dispatch(cartActions.removeFromCart(item.productId));
        }}
      />
    );
  };

  const orderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addToCart(items, state.totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.containerView}>
      <Card style={styles.summary}>
        <Text style={styles.text}>
          Total:{" "}
          <Text style={styles.total}>
            ${Math.round(state.totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        ) : (
          <Button
            title="Order now"
            onPress={orderHandler}
            disabled={items.length <= 0}
            color={Colors.accentColor}
          />
        )}
      </Card>
      <View style={styles.items}>
        <Text style={styles.text}>Cart Items</Text>
        {items.length > 0 && (
          <FlatList
            data={items}
            keyExtractor={(key) => key.productId}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#eee",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 10,
    justifyContent: "space-between",
  },
  items: { flex: 1 },
  text: {
    fontSize: 20,
    fontFamily: "open-sans",
    textAlign: "center",
    paddingVertical: 5,
  },
  total: {
    color: Colors.primaryColor,
    fontFamily: "open-sans-bold",
    margin: 10,
  },
});

export default CartScreen;
