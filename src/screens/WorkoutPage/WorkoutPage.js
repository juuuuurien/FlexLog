import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ToastAndroid,
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
    [navigation, workoutData, state.workouts[id]]
  );

  const handleSaveData = async () => {
    dispatch({
      type: "UPDATE_WORKOUT",
      payload: {
        id: id,
        data: workoutData,
      },
    });
    ToastAndroid.show("Saved!", ToastAndroid.SHORT);
  };

  const HeaderRightComponent = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <StartWorkoutButton id={id} />
        {workoutData !== state.workouts[id] && (
          <Button onPress={handleSaveData}>Save Changes</Button>
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

  const handleDeleteSet = useCallback(
    (set_id) => {
      const newSets = exerciseData.sets.filter((e, i) => {
        return e.id !== set_id;
      });

      const newExercises = [...workoutData.exercises];
      newExercises[exerciseIndex].sets = newSets;

      setWorkoutData((data) => {
        return { ...data, exercises: [...newExercises] };
      });
    },
    [workoutData.exercises]
  );

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

  return (
    <WorkoutDataContextProvider value={{ workoutData, setWorkoutData, id }}>
      <ScrollView
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
      </ScrollView>
    </WorkoutDataContextProvider>
  );
};

export default WorkoutPage;
