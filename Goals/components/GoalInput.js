import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Modal } from "react-native";

const GoalInput = (props) => {
  const [state, setState] = useState("");

  const textInputHandler = (value) => setState(value);

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.containerView}>
        <TextInput
          placeholder="Add goal"
          style={styles.Input}
          onChangeText={textInputHandler}
          value={state}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Button title="Add" onPress={() => props.addGoals(state)} />
          <Button title="Close" onPress={props.close} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
  Input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
});

export default GoalInput;
