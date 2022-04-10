import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { UserDataContext } from "../../context/UserDataContext";
import { WorkoutDataContextProvider } from "../../context/WorkoutDataContext";
import ExerciseComponent from "./components/ExerciseComponent";
import AddExerciseButton from "./components/Buttons/AddExerciseButton";
import StartWorkoutButton from "./components/Buttons/StartWorkoutButton";
import { Portal } from "react-native-paper";
import { useMemo } from "react";
// loop through workouts and render exercise containers

const WorkoutPage = ({ navigation, route }) => {
  const { state, dispatch, setLoading, storeData } =
    useContext(UserDataContext);
  const id = route.params.id;

  const workoutData = state.workouts[id];

  // console.log(state.workouts[id]);
  console.log("in workout data, data is ....... ", workoutData);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    // check if this particular exercise has any added
    // and initialize workout page with data

    if (workoutData === null) return;
    // if (state.workouts[id].exercises !== workoutData.exercises) {
    //   console.log("workkout data in state !== localWorkoutPage Data changed");
    //   console.log("... dispatching to update exercises");
    //   dispatch({
    //     type: "UPDATE_EXERCISE",
    //     payload: { id: id, data: workoutData },
    //   });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useLayoutEffect(() => {
    if (workoutData === null) return;
    navigation.setOptions({
      title: workoutData.name,
      headerRight: () => <StartWorkoutButton id={id} />,
    });
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <Portal.Host>
      <WorkoutDataContextProvider value={{ workoutData, id }}>
        <Animated.View layout={Layout} style={styles.container}>
          {/* {
            <Animated.FlatList
              removeClippedSubviews={false}
              data={workoutData.exercises}
              keyExtractor={(_, index) => index}
              ListFooterComponent={() =>
                !workoutData.finished ? <AddExerciseButton /> : null
              }
              renderItem={({ item, index }) => {
                return (
                  <ExerciseComponent
                    key={index}
                    exerciseData={item}
                    exerciseIndex={index}
                  />
                );
              }}
            />
          } */}
          <ScrollView>
            {state.workouts[id].exercises.map((item, index) => {
              return (
                <ExerciseComponent
                  key={index}
                  exerciseData={item}
                  exerciseIndex={index}
                />
              );
            })}
            <AddExerciseButton />
          </ScrollView>
        </Animated.View>
      </WorkoutDataContextProvider>
    </Portal.Host>
  );
};

export default WorkoutPage;
