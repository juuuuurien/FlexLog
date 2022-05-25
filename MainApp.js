import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import WorkoutListNavigator from "./src/screens/WorkoutList/WorkoutListNavigator";

import { CombinedDarkTheme, CombinedDefaultTheme } from "./src/theme";

import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "./redux/slices/workoutsSlice";
import { fetchSettings } from "./redux/slices/settingsSlice";

export default function MainApp() {
  const { darkTheme } = useSelector((state) => state.settings.settings);
  const dispatch = useDispatch();

  const getTheme = () => {
    if (darkTheme === true) return CombinedDarkTheme;
    return CombinedDefaultTheme;
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(fetchSettings());
  }, []);

  return (
    <PaperProvider theme={getTheme()}>
      <NavigationContainer theme={getTheme()}>
        <WorkoutListNavigator />
        <StatusBar style={darkTheme === true ? "light" : "dark"} />
      </NavigationContainer>
    </PaperProvider>
  );
}
