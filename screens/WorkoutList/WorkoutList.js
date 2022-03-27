import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import { Box, Text, FlatList, Icon, AddIcon, Center, Fab } from "native-base";
// need to render a list of clickable workouts that take you to a workout screen

import WorkoutListItem from "./components/WorkoutListItem";
import { UserDataContext } from "../../context/UserDataContext";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";

const initial_state = {
  workouts: {},
};

const data = [
  { id: "bd96-145571e29d72", date: "July 7, 2022", name: "Push Day" },
];

const WorkoutList = ({ navigation }) => {
  const { state, dispatch } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  const ListComponent = () => {
    return (
      <FlatList
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

  const EmptyListComponent = () => {
    return (
      <Center>
        <Text>You have not logged any workouts</Text>
        <Text>Press + to add one</Text>
      </Center>
    );
  };

  // const data = userData.workouts;

  return (
    <Box
      _light={{ bg: "coolGray.50" }}
      _dark={{ bg: "coolGray.900" }}
      h="100%"
      justifyContent="center"
      p={5}
    >
      {state.workouts !== null && Object.keys(state.workouts).length > 0 ? (
        <ListComponent />
      ) : (
        <EmptyListComponent />
      )}
      <CreateWorkoutModal showModal={showModal} setShowModal={setShowModal} />
      <Fab
        renderInPortal={false}
        onPress={() => setShowModal(true)}
        size="lg"
        right={25}
        bottom={25}
        icon={<AddIcon size="sm" />}
      />
      <Fab
        renderInPortal={false}
        onPress={() => {
          dispatch({ type: "CLEAR_DATA", payload: initial_state });
          AsyncStorage.clear();
        }}
        bg="#bd1133"
        size="lg"
        placement={"bottom-left"}
        icon={<Icon as={Feather} name="x" size="xs" />}
      />
    </Box>
  );
};

export default WorkoutList;
