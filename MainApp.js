import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import MainAppNavigator from "./src/screens/Navigators/MainAppNavigator";

import { CombinedDarkTheme, CombinedDefaultTheme } from "./src/theme";

import Loading from "./src/global/components/Loading";

import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "./redux/slices/workoutsSlice";
import { fetchSettings } from "./redux/slices/settingsSlice";

export default function MainApp() {
  const [loading, setLoading] = useState(true);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const getTheme = () => {
    if (settings.data?.darkTheme === true) return CombinedDarkTheme;
    return CombinedDefaultTheme;
  };

  const initMainApp = async () => {
    try {
      await dispatch(fetchWorkouts()).unwrap();
      await dispatch(fetchSettings()).unwrap();
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initMainApp();
  }, []);

  // initialize state before rendering
  if (loading) return <Loading />;

  return (
    <PaperProvider theme={getTheme()}>
      <NavigationContainer theme={getTheme()}>
        <MainAppNavigator />
        <StatusBar
          style={settings.data?.darkTheme === true ? "light" : "dark"}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
