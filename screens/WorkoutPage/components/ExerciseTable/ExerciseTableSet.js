import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { DataTable, TextInput, Colors } from 'react-native-paper';
import { WorkoutDataContext } from '../../../../context/WorkoutDataContext';


const ExerciseTableSet = ({ set_count, setData, exerciseIndex, setIndex }) => {
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [weight, setWeight] = useState(setData.weight);
  const [reps, setReps] = useState(setData.reps);

  useEffect(() => {
    if (workoutData.exercises[exerciseIndex].sets[setIndex].weight !== weight) {
      const newExerciseArray = [...workoutData.exercises];
      // update exercise with a new set object
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        weight: weight,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }

    if (workoutData.exercises[exerciseIndex].sets[setIndex].reps !== reps) {
      const newExerciseArray = [...workoutData.exercises];
      // update exercise with a new set object
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        reps: reps,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  }, [workoutData]);

  const handleWeightChange = (value) => {
    setWeight(value.toString());
  };

  const handleRepsChange = (value) => {
    setReps(value.toString());
  };

  const styles = StyleSheet.create({
    row: {
      paddingHorizontal: 30
    },
     offsetTitle: {
      marginLeft: 10,
      justifyContent: 'space-around',
    },
    textInput: {
      textAlign:'center',
      width: 72,
    
    },
  });

  return (
    <DataTable.Row  style={styles.row}>
      <DataTable.Cell>{set_count}</DataTable.Cell>
      <DataTable.Cell style={styles.offsetTitle} numeric>
        <TextInput
        dense
          underlineColor="transparent"
          keyboardType="numeric"
          style={styles.textInput}
          value={weight}
          onChangeText={handleWeightChange}
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
          onChangeText={handleRepsChange}
          maxLength={3}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default ExerciseTableSet;
