import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TouchableButton from "./TouchableButton";

const GoalItem = (props) => {
  return (
    <TouchableButton onPress={props.onDelete.bind(this, props.index)}>
      <View style={styles.list}>
        <Text>{props.title}</Text>
      </View>
    </TouchableButton>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  list: {
    padding: 10,
    backgroundColor: "lightblue",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "grey",
  },
});

export default GoalItem;
