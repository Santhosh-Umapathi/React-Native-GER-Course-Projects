import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  const { onPress, item, deletable } = props;

  return (
    <View style={styles.containerView}>
      <View style={styles.itemData}>
        <Text style={styles.quanity}>{item.quantity}</Text>
        <Text style={styles.title}>{item.productTitle}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.amount}>{item.sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onPress} style={styles.delete}>
            <Ionicons name="ios-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quanity: {
    fontSize: 20,
    fontFamily: "open-sans",
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    maxWidth: 120,
    paddingLeft: 10,
  },
  amount: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  delete: { marginLeft: 20 },
});

export default CartItem;
