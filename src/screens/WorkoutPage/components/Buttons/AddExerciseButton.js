import React, { useContext } from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { UserDataContext } from "../../../../context/UserDataContext";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import { empty_exercise } from "../../../../static/empty_exercise";

const AddExerciseButton = (props) => {
  // this will update state with new exercise data...

  const { state, dispatch } = useContext(UserDataContext);
  const { id } = useContext(WorkoutDataContext);

  const handlePress = useCallback(() => {
    const newStateExercises = [
      ...state.workouts[id].exercises,
      { ...empty_exercise },
    ];

    dispatch({
      type: "CREATE_EXERCISE",
      payload: { id: id, data: newStateExercises },
    });
  }, [state]);
  return (
    <Button {...props} style={styles.button} onPress={handlePress}>
      {"Add an exercise"}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default AddExerciseButton;
