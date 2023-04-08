import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//Components
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
//Constants
import Colors from "../../constants/Colors";
//Redux
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const { text, isValid, key } = action.payload;

      const updatedValues = { ...state.inputValues, [key]: text };
      const updatedValidities = { ...state.inputValidities, [key]: isValid };

      let isFormValid = true;
      for (let formKey in updatedValidities) {
        isFormValid = isFormValid && updatedValidities[formKey];
      }

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: isFormValid,
      };

    default:
      break;
  }
};

const AuthScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  //Validations
  const initialState = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const authHandler = async () => {
    setIsError(null);

    setIsLoading(true);

    try {
      if (isSignUp) {
        await dispatch(
          authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }
      // naviga tion.navigate("Shop");
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (key, inputValue, inputValidity) => {
      formDispatch({
        type: "UPDATE",
        payload: { text: inputValue, isValid: inputValidity, key },
      });
    },
    [formState]
  );

  useEffect(() => {
    isError && Alert.alert(isError);
  }, [isError]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[Colors.accentColor, Colors.primaryColor, "#eee", "#fff"]}
        style={styles.gradient}
      >
        <Card style={styles.card}>
          <ScrollView style={styles.container}>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorLabel="Enter valid email"
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <Input
              id="password"
              label="Password"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorLabel="Enter valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <View style={styles.button}>
              <Button
                title={isSignUp ? "SignUp" : "Login"}
                onPress={authHandler}
                color={Colors.primaryColor}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={isSignUp ? "Go to Login" : "Go to Signup"}
                onPress={() => setIsSignUp(!isSignUp)}
                color={Colors.accentColor}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  card: {
    padding: 20,
    maxHeight: 400,
    width: "80%",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
