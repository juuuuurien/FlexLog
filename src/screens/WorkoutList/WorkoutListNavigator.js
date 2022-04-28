import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutList from "./WorkoutList";
import WorkoutPage from "../WorkoutPage/WorkoutPage";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

const WorkoutListNavigator = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShown: true,
        headerRightContainerStyle: {
          paddingRight: 24,
        },
      }}
    >
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutList}
        options={{ title: "Your Workouts", headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutPage"
        options={{ presentation: "modal" }}
        component={WorkoutPage}
      />
    </Stack.Navigator>
  );
};

export default WorkoutListNavigator;
