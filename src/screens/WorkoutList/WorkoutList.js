import React, { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { FAB, Portal, withTheme, useTheme, Colors } from "react-native-paper";
import ListItem from "./components/ListItem";
import { UserDataContext } from "../../context/UserDataContext";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { KeyboardAvoidingView } from "react-native-web";

const initial_state = {
  workouts: {},
};

const WorkoutList = ({ navigation }) => {
  const { colors } = useTheme();
  const { state, dispatch } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  console.log("this is rendering ins WORKOUTLIST");
  console.log(showModal);

  // const ListComponent = () => {
  //   return (
  //     <FlatList
  //       data={Object.keys(state.workouts)}
  //       keyExtractor={(item) => {
  //         return item;
  //       }}
  //       renderItem={({ item }) => {
  //         return (
  //           <ListItem
  //             id={item}
  //             item={state.workouts[item]}
  //             navigation={navigation}
  //           />
  //         );
  //       }}
  //     />
  //   );
  // };

  // To sort each list item into its own Month / Year ---
  // Get array of workout date strings converted into Month Year format.

  // for ( const id in state.workouts ) {
  //   console.log(dayjs(state.workouts[id].date).format('MMMM YYYY'))
  // }

  const getFlatlistData = useCallback(() => {
    const formatToMMMMYYYY = Object.keys(state.workouts).map((id) =>
      dayjs(state.workouts[id].date).format("MMMM YYYY")
    );
    const sectionTitles = [...new Set(formatToMMMMYYYY)];

    const data = sectionTitles.map((monthAndYear) => {
      let obj = {};
      let arr = [];
      for (const id in state.workouts) {
        if (dayjs(state.workouts[id].date).format("MMMM YYYY") === monthAndYear)
          arr.push(id);
      }
      obj = { [monthAndYear]: arr };
      return obj;
    });

    return data;
  }, [state.workouts]);

  const WorkoutListSection = ({ monthAndYear, ids }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[styles.dateHeader, { color: colors.text }]}
        >{`${monthAndYear}`}</Text>
        {ids.map((id, index) => {
          return (
            <ListItem
              key={id}
              s
              id={id}
              item={state.workouts[id]}
              navigation={navigation}
            />
          );
        })}
      </View>
    );
  };

  const ListScreen = () => {
    // Flatlist receives an object
    // as such {
    //          'dateString': [id, id id],
    //          'dateString2': [id, id id]
    //         }

    return (
      <FlatList
        style={styles.flatList}
        data={getFlatlistData()}
        keyExtractor={(_, index) => {
          return index;
        }}
        renderItem={({ item }) => {
          const monthAndYear = Object.keys(item)[0];
          const ids = item[monthAndYear];
          return <WorkoutListSection monthAndYear={monthAndYear} ids={ids} />;
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
        <CreateWorkoutModal
          show={() => {
            setShowModal(true);
          }}
          hide={() => setShowModal(false)}
          visible={showModal}
        />
      </Portal>
      <FAB
        style={[styles.fab, { backgroundColor: colors.primary }]}
        icon={"plus"}
        onPress={() => {
          setShowModal(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginVertical: 6,
  },
  flatList: { width: "100%" },
  dateHeader: {
    paddingHorizontal: 14,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(WorkoutList);
