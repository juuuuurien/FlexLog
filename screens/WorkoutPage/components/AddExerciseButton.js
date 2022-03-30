import React, { useState, useContext } from "react";
import {Button} from 'react-native-paper'
import {View} from 'react-native'
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Pressable,
  VStack,
  Center,
  Fab,
  AddIcon,
  Container,
  Input,
} from "native-base";
import { WorkoutDataContext } from "../../../context/WorkoutDataContext";
import {empty_exercise} from '../../../static/empty_exercise';

const AddExerciseButton = (props) => {
  // this will update WorkoutDataState and append it with an empty exercise
  // maybe just set up the reducer to handle state changes globally rather than
  // using local states

  const { workoutData, setWorkoutData, id } = useContext(WorkoutDataContext);


  const handlePress = () => {
    console.log('this is an empty exercise')
    console.log(empty_exercise)
    setWorkoutData({
      ...workoutData,
      exercises: [...workoutData.exercises, {exercise_name: '', sets: [{weight: '', reps: ''}]}],
    });
  };

  return (
    <Button {...props} onPress={handlePress}>
      {"Add an exercise"}
    </Button>
  );
};

export default AddExerciseButton;
