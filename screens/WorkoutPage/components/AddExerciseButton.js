import React, { useState, useContext } from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Button,
  VStack,
  Center,
  Fab,
  AddIcon,
  Container,
  Input,
} from 'native-base';
import {WorkoutDataContext} from '../../../context/WorkoutDataContext'

const AddExerciseButton = () => {
  // this will update WorkoutDataState and append it with an empty exercise
  // maybe just set up the reducer to handle state changes globally rather than
  // using local states

  const {workoutData, setWorkoutData, id} = useContext(WorkoutDataContext);

  const empty_exercise = {
    exercise_name: '',
    sets: [{ weight: 0, reps: 0 }],
  };

  const handlePress = () => {
    setWorkoutData({...workoutData, exercises: [...workoutData.exercises, empty_exercise]})
  }

  return <Button onPress={handlePress}>{'Add an exercise'}</Button>;
};

export default AddExerciseButton;
