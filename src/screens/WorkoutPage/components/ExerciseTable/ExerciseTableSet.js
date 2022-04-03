import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  DataTable,
  TextInput,
  IconButton,
  TouchableRipple,
  Portal,
  useTheme,
} from 'react-native-paper';
import { WorkoutDataContext } from '../../../../context/WorkoutDataContext';

const ExerciseTableSet = ({ set_count, setData, exerciseIndex, setIndex }) => {
  const { colors } = useTheme();
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);

  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [pressed, setPressed] = useState(false);

  const setWeightFromState =
    workoutData.exercises[exerciseIndex].sets[setIndex].weight;
  const setRepsFromState =
    workoutData.exercises[exerciseIndex].sets[setIndex].reps;

  useEffect(() => {
    setWeight(setWeightFromState);
    setReps(setRepsFromState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

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

  const handleDelete = () => {
    const newSetArray = [...workoutData.exercises[exerciseIndex].sets];
    newSetArray.splice(setIndex, 1);
    const newExerciseArray = [...workoutData.exercises];
    newExerciseArray[exerciseIndex].sets = newSetArray;

    setWorkoutData({ ...workoutData, exercises: newExerciseArray });
  };

  const styles = StyleSheet.create({
    row: {
      flex: 1,
      paddingHorizontal: 30,
    },
    offsetTitle: {
      marginLeft: 10,
      justifyContent: 'space-around',
    },
    textInput: {
      textAlign: 'center',
      width: 72,
    },
  });

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableRipple
        style={{ flex: 1, flexDirection: 'row' }}
        onLongPress={() => {
          if (!workoutData.finished) setPressed(true);
        }}
        onPress={!workoutData.finished ? dismissDelete : null}
        rippleColor={colors.primary}>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>{set_count}</DataTable.Cell>
          <DataTable.Cell style={styles.offsetTitle} numeric>
            <TextInput
              disabled={workoutData.finished}
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
              disabled={workoutData.finished}
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
          onPress={() => {
            setPressed(false);
            handleDelete();
          }}
          style={{
            margin: 0,
            height: 'auto',
            width: 48,
            borderRadius: 0,
            backgroundColor: 'red',
          }}
          icon="trash-can-outline"
          color={'white'}
        />
      )}
    </View>
  );
};

export default ExerciseTableSet;
