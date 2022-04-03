import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { WorkoutDataContext } from '../../../../context/WorkoutDataContext';
import { empty_exercise } from '../../../../static/empty_exercise';
const AddExerciseButton = (props) => {
  // this will update WorkoutDataState and append it with an empty exercise
  // maybe just set up the reducer to handle state changes globally rather than
  // using local states

  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);

  const handlePress = () => {
    setWorkoutData({
      ...workoutData,
      exercises: [...workoutData.exercises, { ...empty_exercise }],
    });
  };

  return (
    <Button {...props} onPress={handlePress}>
      {'Add an exercise'}
    </Button>
  );
};

export default AddExerciseButton;
