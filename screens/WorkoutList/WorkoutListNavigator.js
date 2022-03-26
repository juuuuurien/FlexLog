import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutList from "./WorkoutList";
import WorkoutPage from "../WorkoutPage/WorkoutPage";

const Stack = createStackNavigator();

const WorkoutListNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="WorkoutList" component={WorkoutList} />
      <Stack.Screen name="WorkoutPage" component={WorkoutPage} />
    </Stack.Navigator>
  );
};

export default WorkoutListNavigator;
