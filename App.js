import React, { useEffect, useState } from "react";
import {
  AppState,
  Platform,
  StatusBar,
  View,
  useColorScheme,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "./redux";

import { Provider as StoreProvider, useSelector } from "react-redux";

import MainApp from "./MainApp";
import Loading from "./src/global/components/Loading";

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
  const userData = await AsyncStorage.getItem("userSettings");
  console.log("getting userData from AsyncStorage => ... ", userData);
  if (userData === null) {
    console.log("WARNING ================ > userSettings is null!");
    await AsyncStorage.setItem(
      "userSettings",
      JSON.stringify({
        firstStart: true,
        username: "",
        maxes: { squat: "0", bench: "0", deadlift: "0" },
        weightUnits: "lbs",
        darkTheme: false,
      })
    );
  }
};

const initWorkouts = async () => {
  const workoutData = await AsyncStorage.getItem("workouts");
  if (workoutData !== null) console.log("workouts are NOT null");
  console.log(workoutData);
  if (workoutData === null) {
    console.log("WARNING ================ > workouts is null!");
    await AsyncStorage.setItem("workouts", JSON.stringify([]));
  }
};

export default function App() {
  // initialize providers, then render app with withProviders(App)
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    try {
      await initUserData();
      await initWorkouts();
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  // AsyncStorage.clear();
  useEffect(() => {
    //  initialize data if missing
    initApp();
  });

  if (loading) return <Loading />;

  return (
    <StoreProvider store={store}>
      <MainApp />
    </StoreProvider>
  );
}
