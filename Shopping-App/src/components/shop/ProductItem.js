import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
//Components
import Card from "../../components/UI/Card";

const ProductItem = (props) => {
  const { item, onSelect, children } = props;

  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Card style={styles.containerView}>
      <TouchableComponent onPress={onSelect} useForeground>
        <View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text2}>${item.price.toFixed(2)}</Text>
          </View>

          <View style={styles.actions}>{children}</View>
        </View>
      </TouchableComponent>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
  textContainer: {
    alignItems: "center",
    height: "15%",
  },
  text: {
    fontSize: 20,
    marginVertical: 5,
    fontFamily: "open-sans-bold",
  },
  text2: {
    fontSize: 16,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
