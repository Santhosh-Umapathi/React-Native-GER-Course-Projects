import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import moment from "moment";
//Components
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

const OrderItem = (props) => {
  const { item } = props;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.containerView}>
      <View style={styles.summary}>
        <Text style={styles.date}>
          {
            moment(item.date).format("MMMM Do YYYY, hh:mm")
            /* item.date.toLocaleString("en-EN", year: "numeric",month: "long",day: "numeric",hour: "2-digit" minute: "2-digit"}) Doesn't format on Android*/
          }
        </Text>
        <Text style={styles.total}>${item.totalAmount.toFixed(2)}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={{ width: "100%" }}>
          {item.items.map((cItem) => {
            return <CartItem item={cItem} key={cItem.productId} />;
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    width: "90%",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 15,
  },
  total: { fontFamily: "open-sans-bold", fontSize: 16 },
  date: { fontFamily: "open-sans", fontSize: 16, color: "#888" },
});

export default OrderItem;
