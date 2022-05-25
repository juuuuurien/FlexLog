import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPage from "../WorkoutPage/WorkoutPage";
import NewWorkoutList from "./NewWorkoutList";
import Settings from "../Settings/Settings";

import { useTheme } from "react-native-paper";
import { store } from "../../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const WorkoutListNavigator = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenListeners={({ navigation }) => ({
        beforeRemove: async (e) => {
          e.preventDefault();
          const { settings, workouts } = store.getState();
          console.log(settings);
          try {
            await AsyncStorage.setItem(
              "userSettings",
              JSON.stringify(settings.settings)
            );
            await AsyncStorage.setItem(
              "workouts",
              JSON.stringify(workouts.workouts)
            );
          } catch (err) {
            console.warn(err);
          } finally {
            navigation.dispatch(e.data.action);
          }
        },
        state: (e) => {
          // Save whenever state is changed

          const { settings, workouts } = store.getState();
        },
      })}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
          height: 100,
        },
      }}
    >
      <Stack.Screen
        name="NewWorkoutList"
        component={NewWorkoutList}
        options={{ title: "Your Workouts" }}
      />
      <Stack.Screen
        name="WorkoutPage"
        component={WorkoutPage}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutListNavigator;
