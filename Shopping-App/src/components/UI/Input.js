import React, { useEffect, useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      const { value, isValid } = action.payload;
      return { ...state, value, isValid };

    case "INPUT_BLUR":
      return { ...state, touched: true };

    default:
      return state;
  }
};

const Input = (props) => {
  const { onInputChange, id } = props;

  const initialState = {
    value: props.initialValue || "",
    isValid: props.initialIsValud || false,
    touched: false,
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: "INPUT_CHANGE", payload: { value: text, isValid } });
  };

  const lostFocus = () => dispatch({ type: "INPUT_BLUR" });

  useEffect(() => {
    state.touched && onInputChange(id, state.value, state.isValid);
  }, [state]);

  return (
    <View style={styles.form}>
      <Text style={styles.text}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={state.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocus}
      />
      {!state.isValid && state.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.errorLabel}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginVertical: 8,
    fontFamily: "open-sans-bold",
  },
  input: { padding: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  form: { width: "100%" },
  error: {
    color: "red",
    padding: 5,
    fontFamily: "open-sans-bold",
  },
  errorContainer: {},
});

export default Input;
