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
  const [storageValue, updateStorage] = useAsyncStorage("userData");
  const { state, dispatch, setLoading, loading } = useContext(UserDataContext);
  const id = route.params.id;

  // upon navigation, create a context that wraps all children
  // with this workout's data, fetched via state.

  // upon leaving this screen, save data back to state store.

  const [workoutData, setWorkoutData] = useState(state.workouts[id]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (workoutData !== state.workouts[id]) {
          // If we don't have unsaved changes, then we don't need to do anything
          e.preventDefault();
          // Prompt the user before leaving the screen
          Alert.alert(
            "Save changes?",
            "You have unsaved changes. Do you want to save and leave?",
            [
              {
                text: "Leave without saving",
                style: "destructive",
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => {
                  navigation.dispatch(e.data.action);
                },
              },
              {
                text: "Save",
                style: "cancel",
                onPress: () => {
                  dispatch({
                    type: "UPDATE_WORKOUT",
                    payload: {
                      id: id,
                      data: workoutData,
                    },
                  });
                  navigation.dispatch(e.data.action);
                },
              },
            ],
            { cancelable: true }
          );
        }

        return;
      }),
    [workoutData, state.workouts[id]]
  );

  const handleSaveData = () => {
    dispatch({
      type: "UPDATE_WORKOUT",
      payload: {
        id: id,
        data: workoutData,
      },
    });
  };

  const HeaderRightComponent = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <StartWorkoutButton
          id={id}
          workoutData={workoutData}
          setWorkoutData={setWorkoutData}
        />
        {workoutData !== state.workouts[id] && (
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
  }, [workoutData, state.workouts[id]]);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
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
