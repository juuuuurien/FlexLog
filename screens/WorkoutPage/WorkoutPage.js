import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useRef,
} from 'react';
import { Alert } from 'react-native';
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
import { UserDataContext } from '../../context/UserDataContext';
import {
  WorkoutDataContextProvider,
  WorkoutDataContext,
} from '../../context/WorkoutDataContext';
import ExerciseComponent from './components/ExerciseComponent';
import AddExerciseButton from './components/AddExerciseButton';
import SaveExerciseButton from './components/SaveExerciseButton';
// loop through workouts and render exercise containers

const WorkoutPage = ({ navigation, route }) => {
  const { state, dispatch, setLoading, storeData } =
    useContext(UserDataContext);
  const id = route.params.id;
  const [workoutData, setWorkoutData] = useState(state.workouts[id]);

  // find
  // const exercises = state.exercises[id];

  useEffect(() => {
    // check if this particular exercise has any added
    // and initialize workout page with data
    console.log('How many times does this even run')

    navigation.setOptions({ title: workoutData.name });
    
       if (state.workouts[id].exercises !== workoutData.exercises) 
     dispatch({
          type: 'UPDATE_EXERCISE',
          payload: { id: id, data: workoutData },
        });
  }, [workoutData]);

  return (
    <WorkoutDataContextProvider value={{ workoutData, setWorkoutData, id }}>
      <VStack
        display="flex"
        _light={{ bg: 'coolGray.50' }}
        _dark={{ bg: 'coolGray.900' }}
        minHeight="full"
        minWidth="full"
        p={5}
        space={5}>
        {workoutData && (
          <FlatList
            h={'80%'}
            data={workoutData.exercises}
            keyExtractor={(item, index)=>index}
            renderItem={({ item, index }) => {
              return (
                <ExerciseComponent key={index} data={item} index={index} />
              );
            }}
          />
        )}
        <AddExerciseButton />
      </VStack>
    </WorkoutDataContextProvider>
  );
};

export default WorkoutPage;
