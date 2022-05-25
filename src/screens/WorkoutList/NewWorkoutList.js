import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FAB, IconButton, useTheme } from "react-native-paper";

import Loading from "../../global/components/Loading";
import ListItem from "./components/ListItem";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import HeaderRightContent from "./components/HeaderRightContent";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkout,
  fetchWorkouts,
} from "../../../redux/slices/workoutsSlice";
import { store } from "../../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { STATUS_BAR_HEIGHT } from "../../global/constants";

const EmptyListScreen = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>
        {"You have not logged any workouts."}
      </Text>
      <Text style={{ color: colors.text }}>{`Press the '+' to add one.`}</Text>
    </View>
  );
};

const NewWorkoutList = ({ navigation }) => {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const focused = useIsFocused();
  const dispatch = useDispatch();
  const { workouts, loading } = useSelector((state) => state.workouts);

  // init screen header
  useLayoutEffect(() => {
    if (workouts === null) return;
    navigation.setOptions({
      headerRight: () => {
        return <HeaderRightContent />;
      },
    });
  }, [navigation]);

  // fetch data here on useEffect...
  useEffect(() => {
    // on screen mount, load items into state.
    console.log("fetching workouts from db....");
    if (focused) dispatch(fetchWorkouts());
  }, []);

  // listen to outgoing navigation and save on leaving
  useEffect(() => {
    navigation.addListener("blur", async () => {
      console.log("leaving screen, updating...");

      const workoutsSnapshot = store.getState().workouts.workouts;
      try {
        await AsyncStorage.setItem(
          "workouts",
          JSON.stringify(workoutsSnapshot)
        );
      } catch (err) {
        console.warn(err);
      }
    });
  }, [navigation]);

  // handlers
  const handleDeleteItem = (id, name) => {
    Alert.alert("Delete this workout?", `Do you want to delete "${name}" ?`, [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteWorkout(id));
        },
      },
    ]);
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={EmptyListScreen}
        data={workouts}
        extraData={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            id={item.id}
            navigation={navigation}
            index={index}
            handleDelete={handleDeleteItem}
          />
        )}
      />
      <FAB
        style={[styles.FABButton, { backgroundColor: colors.primary }]}
        icon={"plus"}
        onPress={() => {
          setShowModal(true);
        }}
      />
      <CreateWorkoutModal
        show={() => {
          setShowModal(true);
        }}
        hide={() => setShowModal(false)}
        visible={showModal}
      />
    </View>
  );
};

export default NewWorkoutList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 12,
  },

  flatListContent: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 6,
  },
  FABButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
