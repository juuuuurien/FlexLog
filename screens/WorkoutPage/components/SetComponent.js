import React, { useState, useContext, useEffect } from 'react';
import { Text, Heading, HStack, Box, Input, Button } from 'native-base';

import { WorkoutDataContext } from '../../../context/WorkoutDataContext';

const SetComponent = ({ count, setData, index, exerciseIndex }) => {
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [weight, setWeight] = useState(setData.weight);
  const [reps, setReps] = useState(setData.reps);

  useEffect(() => {
    if (workoutData.exercises[exerciseIndex].sets[index].weight !== weight) {
      const newExerciseArray = [...workoutData.exercises];
      // update exercise with a new set object
      newExerciseArray[exerciseIndex].sets[index] = {
        ...newExerciseArray[exerciseIndex].sets[index],
        weight: parseInt(weight),
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }

    if (workoutData.exercises[exerciseIndex].sets[index].reps !== reps) {
      const newExerciseArray = [...workoutData.exercises];
      // update exercise with a new set object
      newExerciseArray[exerciseIndex].sets[index] = {
        ...newExerciseArray[exerciseIndex].sets[index],
        reps: parseInt(reps),
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  }, [weight, reps]);

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleRepsChange = (value) => {
    setReps(value);
  };

  return (
    <>
      <HStack py={2} alignItems="center">
        <Box px={1} alignItems="center" justifyContent="center" flex={1}>
          <Text>{count}</Text>
        </Box>
        <Box px={1} alignItems="center" justifyContent="center" flex={2}>
          <Input
            textAlign="center"
            fontWeight="semibold"
            fontSize="sm"
            keyboardType={'numeric'}
            bg="blueGray.600"
            borderWidth={0}
            maxHeight={8}
            minWidth={16}
            value={weight.toString()}
            onChangeText={handleWeightChange}
          />
        </Box>
        <Box
          flexDirection="row"
          px={1}
          alignItems="center"
          justifyContent="center"
          flex={2}>
          <Button
            height={8}
            borderRightRadius={0}
            onPress={() => {
              if (parseInt(reps) > 0) setReps(parseInt(reps) - 1);
            }}>
            -
          </Button>
          <Input
            textAlign="center"
            fontWeight="semibold"
            keyboardType={'numeric'}
            fontSize="sm"
            bg="blueGray.600"
            borderWidth={0}
            width={10}
            maxHeight={8}
            value={reps.toString()}
            onChangeText={handleRepsChange}
            borderRadius={0}
          />
          <Button
            height={8}
            borderWidth={0}
            borderLeftRadius={0}
            onPress={() => {
              setReps(parseInt(reps) + 1);
            }}>
            +
          </Button>
        </Box>
      </HStack>
    </>
  );
};

export default SetComponent;
