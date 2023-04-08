import React, { useState, useEffect, useCallback } from "react";
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
  Switch,
} from "react-native";
import { useDispatch } from "react-redux";
import FilterSwitch from "../components/FilterSwitch";
import HeaderButton from "../components/HeaderButton";
import { Colors } from "../constants";
import * as actions from "../store/actions";

const FilterScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);

  const dispatch = useDispatch();

  //Recreats function only when dependency changes
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegeterian: isVegeterian,
    };

    dispatch(actions.setFilters(appliedFilters));

    console.log("APPLIED Filters", appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian]);

  useEffect(() => {
    navigation.setParams({ saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.containerView}>
      <Text style={styles.text}>Available Filters</Text>

      <FilterSwitch
        label="Gluten-Free"
        state={isGlutenFree}
        setState={setIsGlutenFree}
      />

      <FilterSwitch
        label="Lactose-Free"
        state={isLactoseFree}
        setState={setIsLactoseFree}
      />

      <FilterSwitch label="Vegan" state={isVegan} setState={setIsVegan} />

      <FilterSwitch
        label="Vegeterian"
        state={isVegeterian}
        setState={setIsVegeterian}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (props) => {
  const { navigation } = props;
  return {
    headerTitle: "Your Filters !",
    headerLeft: (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: (
      <HeaderButton
        iconName="ios-save"
        onPress={() => {
          const save = navigation.getParam("saveFilters");
          save();
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default FilterScreen;
