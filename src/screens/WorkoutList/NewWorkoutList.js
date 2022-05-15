import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { UserDataContext } from "../../context/UserDataContext";
import { FAB, Portal, withTheme, useTheme, Colors } from "react-native-paper";

import ListItem from "./components/ListItem";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../global/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteWorkout,
  fetchWorkouts,
} from "../../../redux/slices/workoutsSlice";
import { STATUS_BAR_HEIGHT } from "../../global/constants";
import { store } from "../../../redux";

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

const NewWorkoutList = () => {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const { workouts, loading } = useSelector((state) => state.workouts);

  // fetch data here on useEffect...

  useEffect(() => {
    // on screen mount, load items into state.
    console.log("fetching workouts from db....");
    if (focused) dispatch(fetchWorkouts());
  }, []);

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
        style={styles.container}
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
      <CreateWorkoutModal
        show={() => {
          setShowModal(true);
        }}
        hide={() => setShowModal(false)}
        visible={showModal}
      />
      <FAB
        style={[styles.FABButton, { backgroundColor: colors.primary }]}
        icon={"plus"}
        onPress={() => {
          setShowModal(true);
        }}
      />
    </View>
  );
};

export default NewWorkoutList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: STATUS_BAR_HEIGHT,
  },
  flatListContainer: {
    backgroundColor: "navy",
  },
  flatListContent: {
    flex: 1,
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
