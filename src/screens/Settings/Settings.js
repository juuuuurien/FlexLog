import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { List } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { store } from "../../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaxInput from "./components/MaxInput";
import DarkModeSwitch from "./components/DarkModeSwitch";
import UnitsMenu from "./components/UnitsMenu";
import { fetchSettings } from "../../../redux/slices/settingsSlice";
import Loading from "../../global/components/Loading";

const Settings = () => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.settings);

  const { darkTheme, weightUnits, maxes } = settings;

  const state = useSelector((state) => state);

  console.log(
    settings,
    "asfdslakfja;sdflkjasd;flkjasdfl;kasdjfl;asdkfjasd;fklj"
  );

  // useEffect(() => {
  //   navigation.addListener("blur", async () => {
  //     const settingsSnapshot = store.getState().settings;

  //     try {
  //       await AsyncStorage.setItem(
  //         "userData",
  //         JSON.stringify(settingsSnapshot)
  //       );
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   });
  // }, [navigation]);

  useEffect(() => {
    // on screen mount, load items into state.

    if (focused) {
      console.log("fetching settings from db....");
      dispatch(fetchSettings());
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>{"One Rep Maxes"}</List.Subheader>
        <List.Item
          title="Squat Max"
          right={() => (
            <MaxInput
              type={"squat"}
              style={styles.rightContent}
              weight={maxes.squat}
              weightUnits={weightUnits}
            />
          )}
        />
        <List.Item
          title="Bench Press Max"
          right={() => (
            <MaxInput
              type={"bench"}
              style={styles.rightContent}
              weight={maxes.bench}
              weightUnits={weightUnits}
            />
          )}
        />
        <List.Item
          title="Deadlift Max"
          right={() => (
            <MaxInput
              type={"deadlift"}
              style={styles.rightContent}
              weight={maxes.deadlift}
              weightUnits={weightUnits}
            />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>{"Workout Settings"}</List.Subheader>
        <List.Item
          title="Weight Unit"
          description="Set your units to lbs or kgs"
          left={() => <List.Icon icon="weight" />}
          right={() => (
            <UnitsMenu style={styles.rightContent} weightUnits={weightUnits} />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>{"Theme"}</List.Subheader>
        <List.Item
          title="Dark Mode"
          description="Toggle dark mode"
          left={() => <List.Icon icon="white-balance-sunny" />}
          right={() => (
            <DarkModeSwitch style={styles.rightContent} darkTheme={darkTheme} />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  rightContent: { marginRight: 8 },
});

export default Settings;
