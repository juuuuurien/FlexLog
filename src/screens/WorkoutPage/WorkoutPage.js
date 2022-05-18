import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ToastAndroid,
  Text,
} from "react-native";
import Animated, { Layout, SequencedTransition } from "react-native-reanimated";
import { UserDataContext } from "../../context/UserDataContext";
import { WorkoutDataContextProvider } from "../../context/WorkoutDataContext";
import ExerciseComponent from "./components/ExerciseComponent";
import AddExerciseButton from "./components/Buttons/AddExerciseButton";
import StartWorkoutButton from "./components/Buttons/StartWorkoutButton";
import { Button } from "react-native-paper";

import { create_uid } from "../../util/create_uid";
import Stopwatch from "./components/Stopwatch";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  createExercise,
  deleteExercise,
  updateWorkout,
} from "../../../redux/slices/workoutsSlice";

const WorkoutPage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id, workoutIndex } = route.params;
  const { workouts, loading } = useSelector((state) => state.workouts);

  const workoutData = workouts[workoutIndex];

  // upon navigation, create a context that wraps all children
  // with this workout's data, fetched via state.

  // upon leaving this screen, save data back to state store.

  // const [workoutData, setWorkoutData] = useState(workouts[index]);

  // const handleSaveData = () => {
  //   dispatch({
  //     type: "UPDATE_WORKOUT",
  //     payload: {
  //       id: id,
  //       index: index,
  //       data: workoutData,
  //     },
  //   });
  // };

  // useEffect(() => console.log(workoutData), [workoutData]);

  useLayoutEffect(() => {
    if (workoutData === null) return;
    navigation.setOptions({
      title: workoutData.name,
      headerRight: () => {
        return (
          <StartWorkoutButton
            workoutIndex={workoutIndex}
            workoutData={workoutData}
          />
        );
      },
    });
  }, [workoutData, workouts[workoutIndex]]);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });

  const handleAddExercise = useCallback(() => {
    dispatch(createExercise({ workoutIndex: workoutIndex }));
  }, [workoutData]);

  const handleDeleteExercise = useCallback(
    (exerciseId) =>
      dispatch(deleteExercise({ workoutIndex: workoutIndex, id: exerciseId })),
    [workoutData]
  );

  const handleResetTimer = () => {
    dispatch(
      updateWorkout({
        workoutIndex: workoutIndex,
        data: { startTime: dayjs().format() },
      })
    );
  };

  return (
    <WorkoutDataContextProvider value={{ workoutData, workoutIndex, id }}>
      {workoutData.started && (
        <Stopwatch
          startTime={workoutData.startTime}
          finishTime={workoutData.finishTime}
          started={workoutData.started}
          finished={workoutData.finished}
          handleResetTimer={handleResetTimer}
        />
      )}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.container}
      >
        {workoutData.exercises.map((item, index) => {
          return (
            <ExerciseComponent
              key={item.id}
              exercise_id={item.id}
              exerciseIndex={index}
              exerciseData={item}
              handleDeleteExercise={handleDeleteExercise}
            />
          );
        })}
        <AddExerciseButton handleAddExercise={handleAddExercise} />
      </Animated.ScrollView>
    </WorkoutDataContextProvider>
  );
};

export default WorkoutPage;
