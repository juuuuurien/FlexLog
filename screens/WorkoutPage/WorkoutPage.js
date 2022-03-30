import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useRef,
} from 'react';
import {
  Alert,
  View,
  FlatList,
  StyleSheet,
  KeyboardAwareScrollView,
} from 'react-native';
import {
  Box,
  Text,
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
    console.log(state)
    navigation.setOptions({ title: workoutData.name });
    if (state.workouts[id].exercises !== workoutData.exercises)
      dispatch({
        type: 'UPDATE_EXERCISE',
        payload: { id: id, data: workoutData },
      });
  }, [workoutData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <WorkoutDataContextProvider value={{ workoutData, setWorkoutData, id }}>
      <View style={styles.container}>
        {workoutData && (
          <FlatList
            removeClippedSubviews={false}
            data={workoutData.exercises}
            keyExtractor={(_, index) => index}
            ListFooterComponent={() => <AddExerciseButton />}
            renderItem={({ item, index }) => {
              return (
                <ExerciseComponent
                  key={index}
                  exerciseData={item}
                  exerciseIndex={index}
                />
              );
            }}
          />
        )}
      </View>
    </WorkoutDataContextProvider>
  );
};

export default WorkoutPage;
