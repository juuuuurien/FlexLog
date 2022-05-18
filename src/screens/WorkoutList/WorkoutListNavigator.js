import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPage from "../WorkoutPage/WorkoutPage";
import NewWorkoutList from "./NewWorkoutList";

const Stack = createStackNavigator();

const WorkoutListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#192B32",
          height: 100,
        },
      }}
    >
      <Stack.Screen
        name="NewWorkoutList"
        component={NewWorkoutList}
        options={{ title: "Your New Workouts Please Work", headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutPage"
        component={WorkoutPage}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutListNavigator;
