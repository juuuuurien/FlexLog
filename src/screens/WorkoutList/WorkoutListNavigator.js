import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutList from "./WorkoutList";
import WorkoutPage from "../WorkoutPage/WorkoutPage";
import { useTheme } from "react-native-paper";
import NewWorkoutList from "./NewWorkoutList";

const Stack = createNativeStackNavigator();

const WorkoutListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#192B32",
          height: 100,
          elevation: 6,
        },
        headerShown: true,
        headerRightContainerStyle: {
          paddingRight: 24,
        },
      }}
    >
      <Stack.Screen
        name="NewWorkoutList"
        component={NewWorkoutList}
        options={{ title: "Your New Workouts Please Work", headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutList}
        options={{ title: "Your Workouts", headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutPage"
        options={{ presentation: "modal", detachPreviousScreen: false }}
        component={WorkoutPage}
      />
    </Stack.Navigator>
  );
};

export default WorkoutListNavigator;
