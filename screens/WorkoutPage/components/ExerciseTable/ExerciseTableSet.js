import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  DataTable,
  TextInput,
  IconButton,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

const ExerciseTableSet = ({ set_count, setData, exerciseIndex, setIndex }) => {
  const { colors } = useTheme();
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [pressed, setPressed] = useState(false);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  useEffect(() => {
    setWeight(workoutData.exercises[exerciseIndex].sets[setIndex].weight);
    setReps(workoutData.exercises[exerciseIndex].sets[setIndex].reps);
  }, [workoutData]);

  const handleWeightBlur = () => {
    if (workoutData.exercises[exerciseIndex].sets[setIndex].weight !== weight) {
      const newExerciseArray = [...workoutData.exercises];
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        weight: weight,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  };
  const handleRepsBlur = () => {
    if (workoutData.exercises[exerciseIndex].sets[setIndex].reps !== reps) {
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
    row: {
      flex: 1,
      paddingHorizontal: 30,
    },
    offsetTitle: {
      marginLeft: 10,
      justifyContent: "space-around",
    },
    textInput: {
      textAlign: "center",
      width: 72,
    },
  });

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TouchableRipple
        style={{ flex: 1, flexDirection: "row" }}
        onLongPress={() => {
          setPressed(true);
        }}
        onPress={dismissDelete}
        rippleColor={colors.primary}
      >
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>{set_count}</DataTable.Cell>
          <DataTable.Cell style={styles.offsetTitle} numeric>
            <TextInput
              dense
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
      </TouchableRipple>
      {pressed && (
        <IconButton
          onPress={() => setPressed(false)}
          style={{
            margin: 0,
            height: "auto",
            width: 48,
            borderRadius: 0,
            backgroundColor: "red",
          }}
          icon="trash-can-outline"
          color={"white"}
        />
      )}
    </View>
  );
};

export default ExerciseTableSet;
