import React, { useEffect } from "react";
import {
  AppState,
  Platform,
  StatusBar,
  View,
  useColorScheme,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import WorkoutListNavigator from "./src/screens/WorkoutList/WorkoutListNavigator";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CombinedDarkTheme } from "./src/theme";

import { store } from "./redux";
import { Provider as StoreProvider, useDispatch } from "react-redux";

// let userData = {
//   workouts: {
//     id: {
//       date: string,
//       finished: boolean,
//       exercises: [
//         {
//           name: string,
//           sets: [
//             {
//               weight: number,
//               reps: number,
//               done: boolean,
//             },
//           ],
//         },
//       ],
//     },
//   },
// };

const initUserData = async () => {
  const userData = await AsyncStorage.getItem("userData");
  if (userData === null) {
    console.log("WARNING ================ > userData is null!");
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        username: "",
        maxes: { squat: 0, bench: 0, deadlift: 0 },
        weightUnits: "lb",
        theme: "dark",
      })
    );
  }

  return;
};

const initWorkouts = async () => {
  const workoutData = await AsyncStorage.getItem("workouts");
  if (workoutData === null) {
    console.log("WARNING ================ > workouts is null!");
    await AsyncStorage.setItem("workouts", JSON.stringify([]));
  }

  return;
};

export default function App() {
  // AsyncStorage.clear();
  useEffect(() => {
    //  initialize data if missing
    initUserData();
    initWorkouts();
  });

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <WorkoutListNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
