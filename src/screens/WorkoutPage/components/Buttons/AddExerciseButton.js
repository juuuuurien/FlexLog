import React, { useContext } from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Animated, { Layout } from "react-native-reanimated";
import { UserDataContext } from "../../../../context/UserDataContext";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import { empty_exercise } from "../../../../static/empty_exercise";
import { create_uid } from "../../../../util/create_uid";

const AddExerciseButton = ({ handleAddExercise }) => {
  // this will update state with new exercise data...
  return (
    <Animated.View layout={Layout}>
      <Button style={styles.button} onPress={handleAddExercise}>
        {"Add an exercise"}
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default AddExerciseButton;
