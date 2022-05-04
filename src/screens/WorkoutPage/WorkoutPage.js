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
import { Portal, Button } from "react-native-paper";
import { useAsyncStorage } from "../../../src/hooks/useAsyncStorage";
import { empty_exercise } from "../../static/empty_exercise";
import { create_uid } from "../../util/create_uid";
import Stopwatch from "./components/Stopwatch";
import dayjs from "dayjs";

const WorkoutPage = ({ navigation, route }) => {
  const { state, dispatch } = useContext(UserDataContext);
  const { id, index } = route.params;

  // upon navigation, create a context that wraps all children
  // with this workout's data, fetched via state.

  // upon leaving this screen, save data back to state store.

  const [workoutData, setWorkoutData] = useState(state.workouts[index]);

  const handleSaveData = () => {
    dispatch({
      type: "UPDATE_WORKOUT",
      payload: {
        id: id,
        index: index,
        data: workoutData,
      },
    });
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        handleSaveData();
        return;
      }),
    [workoutData]
  );

  const HeaderRightComponent = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <StartWorkoutButton
          id={id}
          workoutData={workoutData}
          setWorkoutData={setWorkoutData}
        />
        {workoutData !== state.workouts[index] && (
          <Button onPress={handleSaveData}>Save</Button>
        )}
      </View>
    );
  };

  useLayoutEffect(() => {
    if (workoutData === null) return;
    navigation.setOptions({
      title: workoutData.name,
      headerRight: () => <HeaderRightComponent />,
    });
  }, [workoutData, state.workouts[index]]);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 6,
    },
  });

  const handleAddExercise = useCallback(() => {
    setWorkoutData((data) => {
      return {
        ...data,
        exercises: [
          ...data.exercises,
          {
            exercise_name: "",
            sets: [{ weight: "", reps: "", id: create_uid() }],
            id: create_uid(),
          },
        ],
      };
    });
  }, [workoutData]);

  const handleDeleteExercise = useCallback(
    (exercise_id) => {
      const newExercises = workoutData.exercises.filter((e, i) => {
        return e.id !== exercise_id;
      });

      setWorkoutData((data) => {
        return { ...data, exercises: [...newExercises] };
      });
    },
    [workoutData.exercises]
  );

  const handleResetTimer = () => {
    setWorkoutData({ ...workoutData, startTime: dayjs().format() });
  };

  return (
    <WorkoutDataContextProvider
      value={{ workoutData, setWorkoutData, id, handleSaveData }}
    >
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
