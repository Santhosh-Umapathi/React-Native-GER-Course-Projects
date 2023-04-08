import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
//Components
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import TouchableButton from "./components/TouchableButton";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [visible, setVisible] = useState(false);

  const addGoalHandler = (text) =>
    setGoals((prevState) => {
      return [...prevState, text];
    });

  const deleteGoal = (ind) => {
    const filter = goals.filter((item, index) => index !== ind);
    setGoals(filter);
  };

  return (
    <View style={styles.container}>
      <TouchableButton onPress={() => setVisible(!visible)}>
        <View style={styles.add}>
          <Text style={{ color: "white" }}>Add</Text>
        </View>
      </TouchableButton>
      <GoalInput
        addGoals={addGoalHandler}
        visible={visible}
        close={() => setVisible(!visible)}
      />
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <GoalItem title={item} index={index} onDelete={deleteGoal} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  add: {
    backgroundColor: "green",
    padding: 5,
    color: "white",
    alignItems: "center",
  },
});
