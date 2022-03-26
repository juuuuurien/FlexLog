import React, { useContext, useState } from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Icon,
  AddIcon,
  Center,
  VStack,
  Modal,
  FormControl,
  Input,
  Button,
  WarningOutlineIcon,
} from 'native-base';

import dayjs from 'dayjs';
import { workoutSchema } from '../../../static/schemas/WorkoutSchema';
import { UserDataContext } from '../../../context/UserDataContext';
import useAsyncStorage from '../../../hooks/useAsyncStorage';

const CreateWorkoutModal = ({ showModal, setShowModal, handleOnPress }) => {
  const { state, dispatch, setLoading } = useContext(UserDataContext);
  const [inputData, setInputData] = useState('');
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setInputData('');
    setIsError(false);
  };

  const handlePress = () => {
    if (inputData.trim().length > 0) {
      dispatch({
        type: 'CREATE_WORKOUT',
        payload: {
          id: dayjs().unix(),
          data: {
            date: dayjs().format('MM/D/YY'),
            name: inputData.trim(),
            exercises: [],
          },
        },
      });
      //  console.log();
      handleClose();
    } else {
      setIsError(true);
    }
  };

  return (
    <Modal isOpen={showModal} animationPreset="slide" onClose={handleClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          <Heading size="md">Create a workout</Heading>
        </Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={isError}>
            <Input
              isRequired
              size="lg"
              placeholder="Workout name i.e. 'Pull Day'"
              onChangeText={(value) => setInputData(value)}
              value={inputData}
            />
            {isError && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {'Please type a valid name.'}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleClose}>
              Cancel
            </Button>
            <Button onPress={handlePress}>Create</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CreateWorkoutModal;
