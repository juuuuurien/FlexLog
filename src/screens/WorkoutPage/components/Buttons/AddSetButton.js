import React, { useCallback, useContext } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { empty_set } from "../../../../static/empty_set";
import { UserDataContext } from "../../../../context/UserDataContext";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import Animated, { Layout } from "react-native-reanimated";

const AddSetButton = ({
  workoutData,
  exerciseIndex,
  exerciseData,
  handleAddSet,
}) => {
  const { state, dispatch } = useContext(UserDataContext);
  const { id, workkoutData, setWorkoutData } = useContext(WorkoutDataContext);

  return (
    <Animated.View layout={Layout}>
      <Button style={styles.button} onPress={handleAddSet}>
        Add Set
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default AddSetButton;
