import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { FAB, Portal, withTheme, useTheme } from "react-native-paper";
import WorkoutListItem from "./components/WorkoutListItem";
import { UserDataContext } from "../../context/UserDataContext";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initial_state = {
  workouts: {},
};

const WorkoutList = ({ navigation }) => {
  const { colors } = useTheme();
  const { state, dispatch } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  // const ListComponent = () => {
  //   return (
  //     <FlatList
  //       data={Object.keys(state.workouts)}
  //       keyExtractor={(item) => {
  //         return item;
  //       }}
  //       renderItem={({ item }) => {
  //         return (
  //           <WorkoutListItem
  //             id={item}
  //             item={state.workouts[item]}
  //             navigation={navigation}
  //           />
  //         );
  //       }}
  //     />
  //   );
  // };

  const ListScreen = () => {
    return (
      <FlatList
        style={{ width: "100%", padding: 5 }}
        data={Object.keys(state.workouts)}
        keyExtractor={(item) => {
          return item;
        }}
        renderItem={({ item }) => {
          return (
            <WorkoutListItem
              id={item}
              item={state.workouts[item]}
              navigation={navigation}
            />
          );
        }}
      />
    );
  };

  const EmptyListScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>
          {"You have not logged any workouts."}
        </Text>
        <Text
          style={{ color: colors.text }}
        >{`Press the '+' to add one.`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {state.workouts !== null && Object.keys(state.workouts).length > 0 ? (
        <ListScreen />
      ) : (
        <EmptyListScreen />
      )}
      <Portal>
        <CreateWorkoutModal showModal={showModal} setShowModal={setShowModal} />
      </Portal>
      <FAB
        style={styles.fab}
        icon={"plus"}
        onPress={() => {
          setShowModal(true);
        }}
      />
      <FAB
        onPress={() => {
          dispatch({ type: "CLEAR_DATA", payload: initial_state });
          AsyncStorage.clear();
        }}
        color="red"
        style={{ margin: 16, position: "absolute", left: 0, bottom: 0 }}
        icon={"close"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(WorkoutList);
