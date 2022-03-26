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

const SaveExerciseButton = ({onPress}) => {

  return <Button onPress={onPress}>{'Save an exercise'}</Button>;
};

export default SaveExerciseButton;
