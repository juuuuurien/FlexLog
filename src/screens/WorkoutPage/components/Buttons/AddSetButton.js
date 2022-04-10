import React, { useCallback, useContext } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { empty_set } from "../../../../static/empty_set";
import { UserDataContext } from "../../../../context/UserDataContext";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

const AddSetButton = ({
  workoutData,
  exerciseIndex,
  exerciseData,
  setWorkoutData,
}) => {
  const { state, dispatch } = useContext(UserDataContext);
  const { id } = useContext(WorkoutDataContext);

  const handleAddSet = useCallback(() => {
    // append this exercises set array with a new empty set
    const newExercises = workoutData.exercises;
    const newSetArray = [...exerciseData.sets, { ...empty_set }];
    newExercises[exerciseIndex].sets = newSetArray;
    dispatch({
      type: "CREATE_SET",
      payload: { id: id, exerciseIndex: exerciseIndex, data: newExercises },
    });
  }, [workoutData.exercises]);

  return (
    <Button style={styles.button} onPress={handleAddSet}>
      Add Set
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default AddSetButton;
