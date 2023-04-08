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
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const { route } = props;

  const item = route?.params?.item;

  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.containerView}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(item));
          }}
          color={Colors.primaryColor}
        />
      </View>

      <Text style={styles.text2}>${item.price.toFixed(2)}</Text>
      <Text style={styles.text}>{item.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (props) => {
  const { route } = props;
  const item = route?.params?.item;

  return {
    headerTitle: item.title,
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 20,
    fontFamily: "open-sans-bold",
  },
  text2: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans",
  },
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default ProductDetailScreen;
