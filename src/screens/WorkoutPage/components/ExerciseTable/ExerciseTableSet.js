import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { DataTable, TextInput, useTheme } from "react-native-paper";

import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

import SwipeToDelete from "../../../../components/animations/SwipeToDelete";

const ExerciseTableSet = ({
  set_count,
  exerciseIndex,
  setIndex,
  setData,
  handleDeleteSet,
}) => {
  const { colors } = useTheme();
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [weight, setWeight] = useState(setData.weight);
  const [reps, setReps] = useState(setData.reps);
  const [pressed, setPressed] = useState(false);

  const setWeightFromState = setData.weight;
  const setRepsFromState = setData.reps;

  useEffect(() => {
    setWeight(setData.weight);
    setReps(setData.reps);
    console.log("setting");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData.exercises[exerciseIndex]]);

  const handleWeightBlur = () => {
    // after editing text
    // create new array and update weight in this set
    if (setWeightFromState !== weight) {
      const newExerciseArray = [...workoutData.exercises];
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        weight: weight,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  };

  const handleRepsBlur = () => {
    // after editing text
    // create new array and update reps in this set
    if (setRepsFromState !== reps) {
      const newExerciseArray = [...workoutData.exercises];
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        reps: reps,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  };

  const handleWeightChange = (value) => {
    setWeight(value.toString());
  };

  const handleRepsChange = (value) => {
    setReps(value.toString());
  };

  const dismissDelete = () => (pressed ? setPressed(false) : null);

  const styles = StyleSheet.create({
    trashCanContainer: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      position: "absolute",
      backgroundColor: colors.error,
      justifyContent: "flex-end",
    },
    row: {
      backgroundColor: colors.surface,
      paddingHorizontal: 30,
    },
    offsetTitle: {
      marginLeft: 10,
      justifyContent: "space-around",
    },
    textInput: {
      backgroundColor: colors.surfaceLight,
      textAlign: "center",
      width: 72,
      height: 36,
      borderRadius: 5,
      paddingVertical: 0,
    },
  });

  return (
    <SwipeToDelete deleteFn={handleDeleteSet} id={setData.id}>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>{set_count}</DataTable.Cell>
        <DataTable.Cell style={styles.offsetTitle} numeric>
          <TextInput
            dense
            disabled={workoutData.finished}
            underlineColor="transparent"
            keyboardType="numeric"
            style={styles.textInput}
            value={weight}
            onFocus={dismissDelete}
            onChangeText={handleWeightChange}
            onBlur={handleWeightBlur}
            maxLength={3}
          />
        </DataTable.Cell>
        <DataTable.Cell style={styles.offsetTitle} numeric>
          <TextInput
            dense
            disabled={workoutData.finished}
            underlineColor="transparent"
            keyboardType="numeric"
            style={styles.textInput}
            value={reps}
            onFocus={dismissDelete}
            onChangeText={handleRepsChange}
            onBlur={handleRepsBlur}
            maxLength={3}
          />
        </DataTable.Cell>
      </DataTable.Row>
    </SwipeToDelete>
  );
};

export default ExerciseTableSet;
