import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import WelcomeScreen from "./WelcomeScreen";

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
