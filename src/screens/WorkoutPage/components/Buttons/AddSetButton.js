
import React from 'react'
import {Button} from 'react-native-paper'
import {empty_set} from '../../../../static/empty_set'

const AddSetButton = ({workoutData, exerciseIndex, exerciseData, setWorkoutData}) => {

  const handleAddSet = () => {
    // append this exercises set array with a new empty set
    const newExercises = workoutData.exercises;
    const newSetArray = [...exerciseData.sets, { ...empty_set }];
    newExercises[exerciseIndex].sets = newSetArray;
    setWorkoutData({ ...workoutData, exercises: newExercises });
  };


return <Button onPress={handleAddSet}>Add Set</Button>
}

export default AddSetButton

