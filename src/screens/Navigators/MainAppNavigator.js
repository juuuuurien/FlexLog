import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPage from "../WorkoutPage/WorkoutPage";
import NewWorkoutList from "../WorkoutList/NewWorkoutList";
import Settings from "../Settings/Settings";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

import { useTheme } from "react-native-paper";
import { store } from "../../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const MainAppNavigator = () => {
  const { colors } = useTheme();

  const settings = useSelector((state) => state.settings);

  const firstStart = settings?.data.firstStart;
  console.log(firstStart, "+++++++++++++++++++++++++++++");

  return (
    <Stack.Navigator
      initialRouteName={firstStart ? "WelcomeScreen" : "NewWorkoutList"}
      screenListeners={({ navigation }) => ({
        beforeRemove: async (e) => {
          e.preventDefault();
          const { settings, workouts } = store.getState();
          console.log(settings, workouts);
          try {
            await AsyncStorage.setItem(
              "userSettings",
              JSON.stringify(settings.data)
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
      })}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
          height: 100,
        },
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewWorkoutList"
        component={NewWorkoutList}
        options={{ title: "Your Workouts", headerLeft: null }}
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

export default MainAppNavigator;
