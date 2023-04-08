import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as orderActions from "../../store/actions/orders";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";

const OrdersScreen = (props) => {
  const { navigation } = props;

  const state = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await dispatch(orderActions.setOrders());
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getOrders();
  }, [dispatch]);

  if (isError) {
    return (
      <View style={styles.loading}>
        <Text>{isError}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (state.orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Orders available</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerView}>
      <FlatList
        data={state.orders}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => {
          return <OrderItem item={item} />;
        }}
      />
    </View>
  );
};

export const screenOptions = (props) => {
  const { navigation } = props;

  return {
    headerLeft: () => (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerTitle: "Your Orders",
  };
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: "white",
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
